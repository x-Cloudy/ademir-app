import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/User/UserRequest";
import { GenerateCodeService } from "../code/GenerateCodeService";

class CreateUserService {
  async execute({ name, email, password, wallet, whatsapp, indication, roles, code, nick, link }: UserRequest) {
    if (!name) throw new Error("O campo nome é obrigatório.");
    if (!email) throw new Error("O campo email é obrigatório.");
    if (password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    if (!whatsapp) throw new Error("O campo whatsapp é obrigatório.");
    if (!roles || roles.length === 0) throw new Error("O campo roles é obrigatório.");
    if (!nick) throw new Error("O campo nick é obrigatório");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("O e-mail informado é inválido.");
    }

    const serviceCode = new GenerateCodeService();

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado.");
    }

    const passwordHash = await hash(password, 8);
    const finalCode = code || "MS1zM2NyM3Q";

    // Cria o usuário
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        wallet,
        whatsapp,
        roles,
        indication,
        active: true,
        codeInvite: finalCode,
        nick,
        link,
      },
      select: { id: true, name: true, nick: true, email: true, codeInvite: true },
    });

    // Processa o código de indicação, se existir
    if (finalCode) {
      const decoded = serviceCode.decodeInviteCode(finalCode);
      const sponsorId = Number(decoded);

      if (isNaN(sponsorId)) {
        throw new Error("Código de convite inválido.");
      }

      const sponsorUser = await prismaClient.user.findFirst({
        where: { id: sponsorId },
        select: { id: true, sidePreference: true },
      });

      if (!sponsorUser) {
        throw new Error("Usuário patrocinador não encontrado.");
      }

      // Salva o indicado na tabela de indicações
      await prismaClient.indicatedUsers.create({
        data: {
          indicatorId: sponsorUser.id,
          indicatedId: user.id,
        },
      });
    }

    return user;
  }
}

export { CreateUserService };
