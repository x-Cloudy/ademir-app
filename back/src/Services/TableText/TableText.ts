import prismaClient from "../../prisma";

export class TableTextService {
    async execute(text : any) {
        const tabletext = await prismaClient.tableText.create({
            data: {
                text: text,
            },
        });

        return tabletext;
    }

    async executeGet() {
        const tabletext = await prismaClient.tableText.findMany({});
        return tabletext;
    }

    async executeDelete(id: string) {
        const tabletext = await prismaClient.tableText.delete({
            where: {
                id: parseInt(id),
            }
        });
        return tabletext;
    }
}