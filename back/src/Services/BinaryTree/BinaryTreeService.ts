import { PrismaClient } from "@prisma/client";
import { GenerateCodeService } from "../code/GenerateCodeService";
import prismaClient from "../../prisma";

const prisma = new PrismaClient();

export class BinaryTreeService {
  async addUserToTree(code: string, indicate: string) {
    // Decodifica o código para extrair o id do usuário indicador (sponsor)
    const decode = new GenerateCodeService();
    const decodedCode = decode.decodeInviteCode(code);
    // Substitua aqui pelo valor correto:
    const sponsorId = 1; // parseInt(String(decodedCode)) se estiver correto no seu fluxo

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

    // Busca o nó do sponsor na árvore
    let currentNode = await prisma.binaryTree.findUnique({
      where: { userId: sponsorId },
    });
    if (!currentNode) {
      throw new Error("Sponsor não encontrado na árvore.");
    }

    /**
     * Percorre a árvore até encontrar um nó que não tenha filho na posição
     * definida pelo sidePreference do usuário DO PRÓPRIO nó (currentNode).
     */
    while (true) {
      // 1) Descobre a preferência (left ou right) do usuário referente a currentNode
      const currentUser = await prismaClient.user.findUnique({
        where: { id: currentNode.userId },
        select: { sidePreference: true },
      });

      if (!currentUser) {
        throw new Error(`Usuário de ID ${currentNode.userId} não encontrado.`);
      }

      const currentPreference = currentUser.sidePreference;
      if (currentPreference !== "left" && currentPreference !== "right") {
        throw new Error("A posição (left ou right) deve ser informada corretamente no indicador.");
      }

      // 2) Verifica se há espaço (childId) na preferência do currentNode
      if (currentPreference === "left") {
        if (!currentNode.leftChildId) {
          // Achamos o local para inserir o novo nó
          break;
        } else {
          // Avança para o filho da esquerda e repete o processo
          const nextNode = await prisma.binaryTree.findUnique({
            where: { id: currentNode.leftChildId },
          });
          if (!nextNode) {
            throw new Error("Erro ao buscar nó filho à esquerda.");
          }
          currentNode = nextNode;
        }
      } else {
        // currentPreference === "right"
        if (!currentNode.rightChildId) {
          // Achamos o local para inserir o novo nó
          break;
        } else {
          // Avança para o filho da direita e repete o processo
          const nextNode = await prisma.binaryTree.findUnique({
            where: { id: currentNode.rightChildId },
          });
          if (!nextNode) {
            throw new Error("Erro ao buscar nó filho à direita.");
          }
          currentNode = nextNode;
        }
      }
    }

    // Neste ponto, currentNode não tem um filho na posição preferida dele
    // Cria o novo nó para o usuário
    const newNode = await prisma.binaryTree.create({
      data: {
        userId,
        // sponsorId pode ser o ID do currentNode.userId ou do sponsor original
        // depende de como você define "sponsor" (às vezes sponsor é sempre o primeiro,
        // às vezes é o pai imediato na árvore)
        sponsorId: currentNode.userId,
        leftChildId: null,
        rightChildId: null,
      },
    });

    // Descobrimos novamente a preferência do currentNode para saber se atualizamos o leftChildId ou rightChildId
    const finalUser = await prismaClient.user.findUnique({
      where: { id: currentNode.userId },
      select: { sidePreference: true },
    });
    if (!finalUser) {
      throw new Error("Usuário não encontrado no final da inserção.");
    }

    if (finalUser.sidePreference === "left") {
      await prisma.binaryTree.update({
        where: { id: currentNode.id },
        data: { leftChildId: newNode.id },
      });
    } else {
      await prisma.binaryTree.update({
        where: { id: currentNode.id },
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
