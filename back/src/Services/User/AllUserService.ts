import prismaClient from "../../prisma";
import { GenerateCodeService } from "../code/GenerateCodeService";

interface UserFilters {
    whatsapp?: string;
    name?: string;
    nick?: string;
    email?: string;
}

export class AllUserService {
    async execute(filters?: UserFilters) {
        const users = await prismaClient.user.findMany({
            where: {
                ...(filters?.email && { email: { equals: filters.email } }),
                ...(filters?.whatsapp && { whatsapp: { equals: filters.whatsapp } }),
                ...(filters?.name && { name: { equals: filters.name } }),
                ...(filters?.nick && { nick: { equals: filters.nick } }),
            },
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                whatsapp: true,
                nick: true,
                createdAt: true,
                updatedAt: true,
                roles:true,
                link:true
            }
        });
        return users;
    }

    async execute2(code: string) {

        const decoded = GenerateCodeService.decodeInviteCode(code);
        
        const indicatorId = typeof decoded === 'number' ? decoded : null;
        
        if (!indicatorId) {
            throw new Error("Código de convite inválido ou sem indicador");
        }
    
        return await prismaClient.indicatedUsers.findMany({
            where: { indicatorId },
            include: { indicated: true },
        });
    }
}