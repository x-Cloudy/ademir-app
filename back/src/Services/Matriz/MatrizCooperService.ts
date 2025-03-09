import { response } from "express";
import prismaClient from "../../prisma";

export class MatrizCooperService {
    async execute(indicatorId: string, indicateId: string) {
        const indicator = parseInt(indicatorId, 10);
        const indicate = parseInt(indicateId, 10);

        try {
            const count = await prismaClient.matrizCooper.count();
            const nextOrder = count + 1;

            await prismaClient.matrizCooper.create({
                data: {
                    user: { connect: { id: indicate } },
                    order: nextOrder,
                },
            });

            await prismaClient.user.update({
                where: { id: indicate },
                data: { status: true },
            });
            
            await prismaClient.indicateNominee.create({
                data: {
                    indicatesId: indicator,
                    indicateeId: indicate,
                },
            });

            return response.status(201).json({ message: "Usuário adicionado com sucesso na matriz gold" });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao processar a requisição" });
        }
    }
}
