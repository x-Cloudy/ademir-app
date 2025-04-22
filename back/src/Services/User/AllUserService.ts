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
        email: true,
        whatsapp: true,
        nick: true,
        roles: true,
        link: true,
        wallet:true,
        level: true,
        name: true
      }
    });
    return users;
  }

  async execute2(sponsorNick: string) {
    // Busca case-insensitive pelo nick do sponsor no campo Indicator
    const users = await prismaClient.user.findMany({
        where: {
          indicatorSponsor: {
                equals: sponsorNick.trim(), // Remove espaços e busca exata
                mode: 'insensitive' // Ignora maiúsculas/minúsculas
            }
        },
        select: {
            id: true,
            nick: true,
            plataform: true,
            status: true,
            createdAt: true,
            level:true
        }
    });

    if (users.length === 0) {
        return []; // Retorna array vazio ao invés de erro
    }

    return users;
}

async execute3(userId: number) {
  const currentUser = await prismaClient.user.findUnique({
    where: { id: userId },
    select: { indicatorSponsor: true }
  });

  if (!currentUser) {
    throw new Error("Usuário não encontrado");
  }

  if (!currentUser.indicatorSponsor) {
    throw new Error("Este usuário não tem um sponsor");
  }

  // Busca case-insensitive pelo nick do sponsor
  const sponsor = await prismaClient.user.findFirst({
    where: { 
      nick: { 
        equals: currentUser.indicatorSponsor,
        mode: 'insensitive'
      }
    },
    select: { 
      nick: true,
      whatsapp: true,
      createdAt: true
    }
  });

  if (!sponsor) {
    throw new Error("Sponsor não encontrado");
  }

  return sponsor;
}

    async execute4(take: number = 10) {
        try {
          const topUsers = await prismaClient.user.findMany({
            orderBy: {
              level: 'desc' // Ordena do maior para o menor
            },
            take: take, // Quantidade de usuários a retornar (padrão = 10)
            select: {
              id: true,
              nick: true,
              level: true,
              // Adicione outros campos se necessário
            }
          });
      
          return topUsers;
      
        } catch (error) {
          throw new Error(`Erro ao buscar usuários: ${error.message}`);
        }
      }
}