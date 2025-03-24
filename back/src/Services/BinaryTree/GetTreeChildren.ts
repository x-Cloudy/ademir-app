import prismaClient from "../../prisma";

export class GetTreeChildren {
 

  public async getTreeChildren(userId: number, level: number = 0, maxDepth: number): Promise<any> {
    if (level >= maxDepth) return {}; // Limita a profundidade, retornando objeto vazio

    // Busca o nó da árvore do usuário, incluindo os dados do usuário atual e os filhos
    const node = await prismaClient.binaryTree.findUnique({
      where: { userId },
      select: {
        user: {
          select: {
            id: true,
            nick: true,
            sidePreference: true,
          },
        },
        leftChild: {
          select: {
            user: {
              select: {
                id: true,
                nick: true,
                sidePreference: true,
              },
            },
          },
        },
        rightChild: {
          select: {
            user: {
              select: {
                id: true,
                nick: true,
                sidePreference: true,
              },
            },
          },
        },
      },
    });

    // Se não encontrar o nó ou os dados do usuário, retorna objeto vazio
    if (!node || !node.user) return {};

    // Obtém recursivamente os filhos; se não existirem, retorna objeto vazio
    const left = node.leftChild
      ? await this.getTreeChildren(node.leftChild.user.id, level + 1, maxDepth)
      : {};
    const right = node.rightChild
      ? await this.getTreeChildren(node.rightChild.user.id, level + 1, maxDepth)
      : {};

    return {
      id: node.user.id,
      nick: node.user.nick,
      sidePreference: node.user.sidePreference,
      left,
      right,
    };
  }
}
