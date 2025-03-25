import prismaClient from "../../prisma";
import { GenerateCodeService } from "../code/GenerateCodeService";

import { Prisma } from '@prisma/client';

export interface UserFilters {
  search?: string; // Parâmetro para busca geral
  skip?: number;   // Para paginação: quantidade de itens a pular
  limit?: number;  // Para paginação: quantidade máxima de itens a retornar
}

export class AllUserService {
  async execute(filters?: UserFilters) {
    // Define explicitamente o tipo da variável "where"
    const where: Prisma.UserWhereInput = filters?.search
      ? {
          OR: [
            { email: { contains: filters.search, mode: 'insensitive' } },
            { name: { contains: filters.search, mode: 'insensitive' } },
            { whatsapp: { contains: filters.search, mode: 'insensitive' } },
            { nick: { contains: filters.search, mode: 'insensitive' } },
          ]
        }
      : {};

    const users = await prismaClient.user.findMany({
      where,
      orderBy: {
        id: 'asc'
      },
      skip: filters?.skip,
      take: filters?.limit,
      select: {
        id: true,
        name: true,
        email: true,
        whatsapp: true,
        nick: true,
        createdAt: true,
        updatedAt: true,
        roles: true,
        link: true
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