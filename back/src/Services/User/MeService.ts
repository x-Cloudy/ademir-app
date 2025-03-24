import prisma from "../../prisma";

export class MeService {
    async execute(userId: string) {
        const id = Number(userId);

        if (isNaN(id)) {
            throw new Error("ID inválido");
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: { 
                id: true, 
                name: true,
                nick: true,
                email: true, 
                whatsapp: true,
                wallet: true,
                active: true,
                roles: true,
                status: true,
                sidePreference: true,
                codeInvite:true,
                link:true
            },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }
}
