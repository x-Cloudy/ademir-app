import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/User/UserRequest";
import { GenerateCodeService } from "../code/GenerateCodeService";
import { BinaryTreeService } from "../BinaryTree/BinaryTreeService";

class CreateUserService {
  async execute({ name, email, password, wallet, whatsapp, indication, roles, code, nick, link }: UserRequest) {
    if (!name) throw new Error("O campo nome é obrigatório.");
    if (!email) throw new Error("O campo email é obrigatório.");
    if (password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    if (!whatsapp) throw new Error("O campo whatsapp é obrigatório.");
    if (!roles || roles.length === 0) throw new Error("O campo roles é obrigatório.");
    if (!nick) throw new Error("O campo nick é o obrigatório");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("O e-mail informado é inválido.");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado.");
    }

    const passwordHash = await hash(password, 8);

    // Se o código de convite for null ou undefined, coloca o valor padrão
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
        link
      },
      select: { id: true, name: true, nick: true, email: true, codeInvite: true },
    });

    enum Roles {
      Admin = "Admin",
      Invistribe = "Invistribe",
      INTELECTUS = "INTELECTUS"
    }

    // Processar código de indicação, se existir
    if (finalCode) {
      const decoded = GenerateCodeService.decodeInviteCode(finalCode);
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

      // Salvar o indicado na tabela de indicações
      await prismaClient.indicatedUsers.create({
        data: {
          indicatorId: sponsorUser.id,
          indicatedId: user.id,
        },
      });

      // Se a role incluir "Invistribe", adiciona na matriz (registro de indicação)
      if ((roles as any).includes("INTELECTUS")) {
        let sponsorIndications = await prismaClient.indicates.findUnique({
          where: { userId: sponsorUser.id },
        });

        // Se não existir, cria o registro
        if (!sponsorIndications) {
          sponsorIndications = await prismaClient.indicates.create({
            data: {
              userId: sponsorUser.id,
              nominees: [],
              count: 0,
            },
          });
        }

        // Cria o registro na tabela IndicateNominee usando o ID do registro de Indications
        await prismaClient.indicateNominee.create({
          data: {
            indicatesId: sponsorIndications.id,
            indicateeId: user.id,
          },
        });
      } else {
        // Caso contrário, adiciona na árvore binária usando o lado do patrocinador
        const indicate = String(user.id);
        const binaryTreeService = new BinaryTreeService();
        await binaryTreeService.addUserToTree(finalCode, indicate);
      }
    }

    return user;
  }
}

export { CreateUserService };
