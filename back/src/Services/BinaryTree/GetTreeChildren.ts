import prismaClient from "../../prisma";

export class BinaryTreeService {
  async getTreeChildren(userId: number, level: number = 0, maxDepth: number = 15): Promise<any[]> {
    if (level >= maxDepth) return []; // Limita a profundidade em 15 níveis

    // Busca os filhos do usuário na árvore
    const userTree = await prismaClient.binaryTree.findFirst({
      where: { userId },
      select: {
        leftChildren: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                sidePreference: true,
              },
            },
          },
        },
        rightChildren: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                sidePreference: true,
              },
            },
          },
        },
      },
    });

    // Se não houver filhos, retorna array vazio
    if (!userTree) return [];

    let children = [
      ...userTree.leftChildren.map((child) => child.user),
      ...userTree.rightChildren.map((child) => child.user),
    ];

    // Recursivamente pega os filhos dos filhos, até o limite
    for (const child of children) {
      const childTree = await this.getTreeChildren(child.id, level + 1, maxDepth);
      children = [...children, ...childTree];
    }

    return children;
  }
}
