import { response } from "express";
import prismaClient from "../../prisma";
import prisma from "../../prisma";

export class MatrizCooperService {
    async execute(indicatorId: string, indicateId: string) {
        const indicator = parseInt(indicatorId, 10);
        const indicate = parseInt(indicateId, 10);

        try {
            const count = await prisma.matrizCooper.count();
            const nextOrder = count + 1;

            await prisma.matrizCooper.create({
                data: {
                    user: {
                        connect: { id: indicate },
                    },
                    order: nextOrder,
                },
            });

            await prismaClient.user.update({
                where: {
                    id: indicate,
                },
                data: {
                    status: true,
                },
            });

            const data = Date.now();

            await prismaClient.indicates.update({
                where: {
                    id: indicator,
                },
                data: {
                    nominees: {
                        push: `${indicateId} + cooper + ${data}`,
                    },
                    count: {
                        increment: 1,
                    },
                },
            });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Erro ao processar a requisição' });
        }

        return response.status(201).json('Usuário adicionado com sucesso na matriz gold');
    }
}
