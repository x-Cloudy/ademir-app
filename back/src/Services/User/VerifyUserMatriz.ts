import prismaClient from "../../prisma";

export class VerifyUserMatriz {

    async execute(userId: string) {
        const id = parseInt(userId, 10);

        const cooper = await prismaClient.matrizCooper.findFirst({
            where: {
                userId: id
            }
        });

        const silver = await prismaClient.matrizSilver.findFirst({
            where: {
                userId: id
            }
        });

        const gold = await prismaClient.matrizGold.findFirst({
            where: {
                userId: id
            }
        });

        if (!cooper && !silver && !gold) {
            return false;
        }

        if (cooper) {
            return "cooper";
        }

        if (silver) {
            return "silver";
        }

        if (gold) {
            return "gold";
        }
    }
}
