import prismaClient from "../../prisma";

export class TopIndicatesService {

    async top10 () {
        const top = await prismaClient.indicates.findMany({
            orderBy: {
                count: 'desc'
            },
            take: 10
        });
        return top;
    }

    async top3 () {
       const top = await prismaClient.indicates.findMany({
            orderBy: {
                count: 'desc'
            },
            take: 3
        });

        return top;
    }

    async top1 () {
        const top = await prismaClient.indicates.findMany({
            orderBy: {
                count: 'desc'
            },
            take: 1
        });
        return top;
    }
}