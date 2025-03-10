import prismaClient from "../../prisma";

export class TableTextService {
    async execute(text : string) {
        const tabletext = await prismaClient.tableText.create({
            data: {
                text: text,
            },
        });

        return tabletext;
    }

    async executeGet(id: string) {
        const tabletext = await prismaClient.tableText.findUnique({
            where: {
                id: parseInt(id),
            }
        });
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