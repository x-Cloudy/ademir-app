import prismaClient from "../../prisma";

class UpdateUserService {
  async execute({ user_id, data }: { user_id: string; data: any }) {
    const id = parseInt(user_id, 10);

    if (isNaN(id)) {
      throw new Error("ID de usuário inválido.");
    }

    const userExists = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }
    
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }
}

export { UpdateUserService };
