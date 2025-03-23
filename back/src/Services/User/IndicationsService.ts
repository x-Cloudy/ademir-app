import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class IndicationsService {
  async getIndicatedUsers(userId: number) {
    const indicates = await prisma.indicates.findUnique({
      where: { userId },
      include: {
        indicateNominees: {
          include: {
            indicatee: {
              select: {
                id: true,
                name: true,
                whatsapp: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!indicates) {
      return [];
    }

    return indicates.indicateNominees.map(nominee => nominee.indicatee);
  }
}
