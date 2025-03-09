import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class IndicateNomineeService {
  async findBetweenDates(dateStart: string, dateEnd: string) {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    const nominees = await prisma.indicateNominee.findMany({
      where: {
        insertedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        indicates: true,
        indicatee: true,
      },
    });

    return nominees;
  }
}
