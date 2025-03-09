import { response } from "express";
import prismaClient from "../../prisma";

export class MatrizSilverService {
    async execute(indicatorId: string, indicateId: string) {
        const indicator = parseInt(indicatorId, 10);
        const indicate = parseInt(indicateId, 10);

        try {
            // Contar total de registros na matriz para definir a ordem
            const count = await prismaClient.matrizSilver.count();
            const nextOrder = count + 1;

            // Criar o registro na matriz gold
            await prismaClient.matrizSilver.create({
                data: {
                    user: { connect: { id: indicate } },
                    order: nextOrder,
                },
            });

            // Atualizar o status do usuário para ativo
            await prismaClient.user.update({
                where: { id: indicate },
                data: { status: true },
            });

            // Criar a nova indicação na tabela IndicateNominee
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
