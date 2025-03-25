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
        roles: true,
        link: true,
        wallet:true
      }
    });
    return users;
  }

    async execute2(code: string) {
        const serviceCode = new GenerateCodeService();
        const decoded = serviceCode.decodeInviteCode(code);
    
        // Converter para número (ajuste conforme sua lógica de decodificação)
        const indicatorId = Number(decoded); 
        if (isNaN(indicatorId)) {
            throw new Error("Código de convite inválido");
        }
    
        // Busca os usuários com o indicatorId especificado
        const users = await prismaClient.user.findMany({
            where: {
                Indicator: String(indicatorId), // Se Indicator for String
                // OU (se você mudou para Int no schema):
                // Indicator: indicatorId,
            },
            select: {
                id: true,
                nick: true,
                plataform: true,
                status: true,
            },
        });
    
        return users;
    }

    async execute3(userId: number) {
        // 1. Busca o usuário principal
        const currentUser = await prismaClient.user.findUnique({
            where: { id: userId },
            select: { Indicator: true }
        });
    
        if (!currentUser) {
            throw new Error("Usuário não encontrado 🥺");
        }
    
        // 2. Verifica se existe um indicador
        if (!currentUser.Indicator) {
            throw new Error("Usuário não tem um indicador ❌");
        }
    
        // 3. Converte para número (se necessário)
        const indicatorId = parseInt(currentUser.Indicator);
        if (isNaN(indicatorId)) {
            throw new Error("ID do indicador inválido 🚨");
        }
    
        // 4. Busca os dados do indicador
        const indicatorUser = await prismaClient.user.findUnique({
            where: { id: indicatorId },
            select: { 
                nick: true,
                whatsapp: true
            }
        });
    
        if (!indicatorUser) {
            throw new Error("Indicador não encontrado na base 🔎");
        }
    
        return indicatorUser;
    }
}