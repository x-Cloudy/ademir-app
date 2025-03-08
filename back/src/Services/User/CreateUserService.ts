import prismaClient from '../../prisma';
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/User/UserRequest"

class CreateUserService {
  async execute({ name, email, password, wallet, whatsapp }: UserRequest) {
    if (!name) {
      throw new Error("O campo nome é obrigatorio");
    }
    if (!email) {
      throw new Error("O campo email é obrigatorio");
    }
    if (!password) {
      throw new Error("A senha não pode ser vazia");
    }
    if (!wallet) {
      throw new Error("O campo wallet é obrigatorio");
    }
    if (!whatsapp) {
      throw new Error("O campo whatsapp é obrigatorio");
    }


    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        wallet: wallet,
        whatsapp: whatsapp,
        active: true
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService }