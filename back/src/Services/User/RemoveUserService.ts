import prismaClient from "../../prisma";

class RemoveUserService {
  async execute({ user_id }: { user_id: string }) {
    const userId = parseInt(user_id, 10);

    // Validação robusta do ID
    if (isNaN(userId)) {
      throw new Error("ID do usuário inválido");
    }

    return await prismaClient.$transaction(async (prisma) => {
      // 1. Verifica se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
      });

      if (!user) {
        throw new Error("Usuário não encontrado ❌");
      }

      // 2. Exclui todas as dependências
      // BinaryTree
      await prisma.binaryTree.deleteMany({
        where: {
          OR: [
            { userId: userId },
            { sponsorId: userId }
          ]
        }
      });

      // IndicatedUsers (ambos lados da relação)
      await prisma.indicatedUsers.deleteMany({
        where: {
          OR: [
            { indicatorId: userId }, // Onde ele indicou alguém
            { indicatedId: userId }  // Onde foi indicado por alguém
          ]
        }
      });

      // 3. Finalmente exclui o usuário
      await prisma.user.delete({
        where: { id: userId }
      });

      return { message: "Usuário nuclearizado com sucesso 💥" };
    });
  }
}

export { RemoveUserService };