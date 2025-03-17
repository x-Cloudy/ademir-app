import prismaClient from "../../prisma";

export class GetAllTreeService {
  async getEntireTree() {
    const nodes = await prismaClient.binaryTree.findMany();

    const treeMap = new Map<number, any>();

    nodes.forEach(node => {
      treeMap.set(node.userId, { ...node, leftChild: null, rightChild: null });
    });

    let root = null;

    nodes.forEach(node => {
      if (node.sponsorId) {
        const parent = treeMap.get(node.sponsorId);
        if (parent) {
          if (parent.leftChildId === node.userId) {
            parent.leftChild = treeMap.get(node.userId);
          } else if (parent.rightChildId === node.userId) {
            parent.rightChild = treeMap.get(node.userId);
          }
        }
      } else {
        root = treeMap.get(node.userId);
      }
    });

    return root;
  }
}
