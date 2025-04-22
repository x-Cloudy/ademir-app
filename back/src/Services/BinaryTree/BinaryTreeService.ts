import { PrismaClient, Prisma } from "@prisma/client";
import prismaClient from "../../prisma";

export class BinaryTreeService {
    async addUserToTree(
      sponsorId: string, 
      indicate: string,
      tx: Prisma.TransactionClient
    ) {
      const parsedSponsorId = parseInt(sponsorId, 10);
      const userId = parseInt(indicate, 10);
  
      if (isNaN(userId)) throw new Error("ID do usuário inválido");
  
      // Validação de existência
      const [user, sponsor] = await Promise.all([
        tx.user.findUnique({ where: { id: userId } }),
        tx.user.findUnique({ where: { id: parsedSponsorId } })
      ]);
  
      if (!user || !sponsor) {
        throw new Error("Usuário ou sponsor não encontrados");
      }
  
      // Verifica se já está na árvore
      const existingNode = await tx.binaryTree.findUnique({ 
        where: { userId } 
      });
  
      if (existingNode) {
        throw new Error("Usuário já está na árvore");
      }
  
      // Cria root se for o primeiro usuário
      const isFirstUser = (await tx.binaryTree.count()) === 0;
      if (isFirstUser) {
        return await tx.binaryTree.create({
          data: {
            userId,
            sponsorId: null,
            leftChildId: null,
            rightChildId: null,
          },
        });
      }
  
      // Busca nó do sponsor
      let currentNode = await tx.binaryTree.findUnique({
        where: { userId: parsedSponsorId },
        include: { user: true }
      });
  
      if (!currentNode) {
        throw new Error("Sponsor não encontrado na árvore");
      }
  
      // Navegação na árvore
      while (true) {
        if (!currentNode.user?.sidePreference) {
          throw new Error("Preferência de lado não definida");
        }
  
        const childField = currentNode.user.sidePreference === "left" 
          ? "leftChildId" 
          : "rightChildId";
  
        const childId = currentNode[childField];
  
        if (!childId) break;
  
        const nextNode = await tx.binaryTree.findUnique({
          where: { id: childId },
          include: { user: true }
        });
  
        if (!nextNode) {
          throw new Error("Erro na navegação da árvore");
        }
        currentNode = nextNode;
      }
  
      // Cria novo nó
      const newNode = await tx.binaryTree.create({
        data: {
          userId,
          sponsorId: currentNode.id,
          leftChildId: null,
          rightChildId: null,
        },
      });
  
      // Atualiza nó pai
      await tx.binaryTree.update({
        where: { id: currentNode.id },
        data: {
          [currentNode.user.sidePreference === "left" 
            ? "leftChildId" 
            : "rightChildId"]: newNode.id
        }
      });
  
      return newNode;
    }
  
    async getUserTree(userId: number) {
      return await prismaClient.binaryTree.findUnique({
        where: { userId },
        include: { 
          leftChild: true, 
          rightChild: true,
          user: true 
        },
      });
    }
  
    async getPosition(userId: number) {
      const node = await prismaClient.binaryTree.findUnique({ 
        where: { userId },
        include: {
          user: true,
          sponsor: true
        }
      });
      
      if (!node) throw new Error("Usuário não encontrado na árvore.");
  
      return {
        userId: node.userId,
        sponsor: node.sponsorId ? {
          id: node.sponsor?.id,
        } : null,
        leftChildId: node.leftChildId,
        rightChildId: node.rightChildId,
      };
    }
}