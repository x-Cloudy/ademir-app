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
                email: true, 
                whatsapp: true,
                wallet: true,
                active: true,
                status: true
            },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }
}
