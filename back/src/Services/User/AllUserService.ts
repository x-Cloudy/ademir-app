import prismaClient from "../../prisma";

export class AllUserService {
    async execute() {
        // Atualiza todos os usuários (não há codeInvite nulo)
        await prismaClient.user.updateMany({
            data: {
                codeInvite: 'MS1zM2NyM3Q',
            },
        });

        // Retorna todos os usuários
        const users = await prismaClient.user.findMany({});
        return users;
    }
}
