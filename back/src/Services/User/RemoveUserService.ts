import prismaClient from "../../prisma";

class RemoveUserService {
  async execute({ user_id }: { user_id: string }) {
    const userId = parseInt(user_id, 10);

    console.log(userId);

    if (isNaN(userId)) {
      throw new Error("ID do usuário inválido.");
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const remove = await prismaClient.user.delete({
      where: { id: userId }
    });

    return remove;
  }
}

export { RemoveUserService };
