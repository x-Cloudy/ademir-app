import prismaClient from "../../prisma";

export class IndicationsService {
  async getIndications(indicatorId: number) {
    return await prismaClient.indicatedUsers.findMany({
      where: { indicatorId },
      include: { indicated: true },
    });
  }
}
