import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MatrizService {
  async findIndicatedUsers(userId: number) {
    const cooperIndications = await prisma.matrizCooper.findMany({
      where: { userId },
    });

    const silverIndications = await prisma.matrizSilver.findMany({
      where: { userId },
    });

    const goldIndications = await prisma.matrizGold.findMany({
      where: { userId },
    });

    return {
      cooper: cooperIndications,
      silver: silverIndications,
      gold: goldIndications,
    };
  }
}
