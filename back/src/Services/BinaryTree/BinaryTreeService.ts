import { PrismaClient } from "@prisma/client";
import { GenerateCodeService } from "../code/GenerateCodeService";
import prismaClient from "../../prisma";

const prisma = new PrismaClient();

export class BinaryTreeService {
  async addUserToTree(code: string, indicate: string) {
    // Decodifica o código para extrair o id do usuário indicador (sponsor)
    const decode = new GenerateCodeService();
    const decodedCode = decode.decodeInviteCode(code);
    const sponsorId = parseInt(String(decodedCode));

    // Busca os dados do usuário indicador para obter a preferência de posição
    const indicatorData = await prismaClient.user.findFirst({
      where: { id: sponsorId },
      select: { sidePreference: true }
    });

    // Valida se a posição é 'left' ou 'right'
    const position = indicatorData.sidePreference;
    if (position !== "left" && position !== "right") {
      throw new Error("A posição (left ou right) deve ser informada corretamente no indicador.");
    }

    // Converte o id do novo usuário para número
    const userId = parseInt(String(indicate));

    // Verifica se o novo usuário já está na árvore
    const existingNode = await prisma.binaryTree.findUnique({ where: { userId } });
    if (existingNode) {
      throw new Error("Usuário já está na árvore.");
    }

    // Se a árvore estiver vazia, o novo usuário é inserido como root
    const isFirstUser = (await prisma.binaryTree.count()) === 0;
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

    // Para usuários que não são o primeiro, o sponsor deve existir na árvore
    const sponsorNode = await prisma.binaryTree.findUnique({ where: { userId: sponsorId } });
    if (!sponsorNode) {
      throw new Error("Sponsor não encontrado na árvore.");
    }

    // Verifica se a posição desejada está disponível no nó do sponsor
    if (position === "left" && sponsorNode.leftChildId) {
      throw new Error("A posição esquerda já está ocupada.");
    }
    if (position === "right" && sponsorNode.rightChildId) {
      throw new Error("A posição direita já está ocupada.");
    }

    // Cria o novo nó para o usuário
    const newNode = await prisma.binaryTree.create({
      data: {
        userId,
        sponsorId,
        leftChildId: null,
        rightChildId: null,
      },
    });

    // Atualiza o nó do sponsor para referenciar o novo nó na posição correta
    if (position === "left") {
      await prisma.binaryTree.update({
        where: { id: sponsorNode.id },
        data: { leftChildId: newNode.id },
      });
    } else {
      await prisma.binaryTree.update({
        where: { id: sponsorNode.id },
        data: { rightChildId: newNode.id },
      });
    }

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
