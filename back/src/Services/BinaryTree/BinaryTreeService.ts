import { PrismaClient } from "@prisma/client";
import { GenerateCodeService } from "../code/GenerateCodeService";

const prisma = new PrismaClient();

export class BinaryTreeService {
  async addUserToTree(code: string, indicate: string) {
    let sponsorId: number;

    // Se code existir (não for null, undefined ou string vazia), decodifica
    if (code) {
        const decode = new GenerateCodeService();
        const decodedCode = decode.decodeInviteCode(code);
        sponsorId = parseInt(String(decodedCode));
        
        // Validação adicional para garantir que o decodedCode é um número
        if (isNaN(sponsorId)) {
            throw new Error("Código inválido.");
        }
    } 
    // Se code for null, undefined ou vazio, usa sponsorId = 1
    else {
        sponsorId = 1;
    }

    console.log(sponsorId)

    // ... (restante do código permanece igual)

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
          const currentUser = await prisma.user.findUnique({ // Corrigido prismaClient para prisma
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

      // Cria o novo nó para o usuário
      const newNode = await prisma.binaryTree.create({
        data: {
            userId,
            sponsorId: currentNode.id, // Use o ID do nó do sponsor na árvore, não o userId!
            leftChildId: null,
            rightChildId: null,
        },
    });

      // Descobrimos novamente a preferência do currentNode
      const finalUser = await prisma.user.findUnique({ // Corrigido prismaClient para prisma
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
