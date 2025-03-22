import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/User/UserRequest";
import { GenerateCodeService } from "../code/GenerateCodeService";
import { BinaryTreeService } from "../BinaryTree/BinaryTreeService";

class CreateUserService {
  async execute({ name, email, password, wallet, whatsapp, indication, roles, code }: UserRequest) {
    if (!name) throw new Error("O campo nome é obrigatório.");
    if (!email) throw new Error("O campo email é obrigatório.");
    if (!password) throw new Error("A senha não pode ser vazia.");
    if (!whatsapp) throw new Error("O campo whatsapp é obrigatório.");
    if (!roles || roles.length === 0) throw new Error("O campo roles é obrigatório.");

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

    // Criar usuário sem definir `sidePreference`
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
        codeInvite: code
      },
      select: { id: true, name: true, email: true, codeInvite:true },
    });

    enum Roles {
      Admin = "Admin",
      User = "User",
      Moderator = "Moderator",
      Invistribe = "Invistribe",
    }

    // Processar código de indicação, se existir
    if (code) {
      const decoded = GenerateCodeService.decodeInviteCode(code);
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

      // Se a role incluir "Invistribe", adiciona na matriz
      if ((roles as any).includes("Invistribe")) {
        await prismaClient.indicateNominee.create({
          data: {
            indicatesId: sponsorUser.id,
            indicateeId: user.id,
          },
        });
    } else {
        // Caso contrário, adiciona na árvore binária usando o lado do patrocinador
        const indicate = String(user.id);;
        const binaryTreeService = new BinaryTreeService();
        await binaryTreeService.addUserToTree(code, indicate);
      }
    }

    return user;
  }
}

export { CreateUserService };
