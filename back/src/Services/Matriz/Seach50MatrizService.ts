import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Search50MatrizService {

  async findUserMatriz(userId: string) {
    const id = parseInt(userId, 10);
    const cooper = await prisma.matrizCooper.findUnique({
      where: { id },
    });
    const silver = await prisma.matrizSilver.findUnique({
      where: { id },
    });
    const gold = await prisma.matrizGold.findUnique({
      where: { id },
    });

    if (cooper) return { matriz: "Cooper", order: cooper.order };
    if (silver) return { matriz: "Silver", order: silver.order };
    if (gold) return { matriz: "Gold", order: gold.order };

    return null;
  }

  async findNextOrders(userId: number) {

    const userMatriz = await this.findUserMatriz(userId.toString());

    if (!userMatriz) {
      throw new Error("Usuário não encontrado em nenhuma matriz");
    }
    let nextOrders;

    switch (userMatriz.matriz) {
      case "Cooper":
        nextOrders = await prisma.matrizCooper.findMany({
          where: {
            order: { gt: userMatriz.order },
          },
          orderBy: { order: "asc" },
          take: 50,
        });
        break;

      case "Silver":
        nextOrders = await prisma.matrizSilver.findMany({
          where: {
            order: { gt: userMatriz.order },
          },
          orderBy: { order: "asc" },
          take: 50,
        });
        break;

      case "Gold":
        nextOrders = await prisma.matrizGold.findMany({
          where: {
            order: { gt: userMatriz.order },
          },
          orderBy: { order: "asc" },
          take: 50,
        });
        break;

      default:
        throw new Error("Matriz não reconhecida");
    }

    return nextOrders;
  }
}
