import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BinaryTreeService {
  async addUserToTree(userId: number, sponsorId?: number, position?: "left" | "right") {
    userId = parseInt(String(userId));
    sponsorId = sponsorId ? parseInt(String(sponsorId)) : undefined;

    // Verifica se o usuário já está na árvore
    const existingNode = await prisma.binaryTree.findUnique({ where: { userId } });
    if (existingNode) {
      throw new Error("Usuário já está na árvore.");
    }

    // Se for o primeiro usuário da árvore, adiciona sem patrocinador
    const isFirstUser = await prisma.binaryTree.count() === 0;
    if (isFirstUser) {
      const rootNode = await prisma.binaryTree.create({
        data: {
          userId,
          sponsorId: null,
          leftChildId: null,
          rightChildId: null,
        },
      });
      return rootNode;
    }

    // Se não for o primeiro usuário, precisa de um patrocinador
    if (!sponsorId) {
      throw new Error("Patrocinador é obrigatório para adicionar novos usuários.");
    }

    const sponsorNode = await prisma.binaryTree.findUnique({ where: { userId: sponsorId } });
    if (!sponsorNode) {
      throw new Error("Patrocinador não encontrado.");
    }

    // Verifica se a posição desejada está ocupada
    if (position === "left" && sponsorNode.leftChildId) {
      throw new Error("Posição à esquerda já ocupada.");
    }
    if (position === "right" && sponsorNode.rightChildId) {
      throw new Error("Posição à direita já ocupada.");
    }

    // Cria o novo nó na árvore
    const newNode = await prisma.binaryTree.create({
      data: {
        userId,
        sponsorId,
        leftChildId: null,
        rightChildId: null,
      },
    });

    // Atualiza o patrocinador para apontar para o novo nó
    await prisma.binaryTree.update({
      where: { userId: sponsorId },
      data: {
        leftChildId: position === "left" ? userId : sponsorNode.leftChildId,
        rightChildId: position === "right" ? userId : sponsorNode.rightChildId,
      },
    });

    return newNode;
  }

  async getUserTree(userId: number) {
    return await prisma.binaryTree.findUnique({
      where: { userId },
      include: { leftChild: true, rightChild: true },
    });
  }

  async getPosition(userId: number) {
    const node = await prisma.binaryTree.findUnique({ where: { userId } });
    if (!node) throw new Error("Usuário não encontrado na árvore.");

    return {
      userId: node.userId,
      sponsorId: node.sponsorId,
      leftChildId: node.leftChildId,
      rightChildId: node.rightChildId,
    };
  }
}
