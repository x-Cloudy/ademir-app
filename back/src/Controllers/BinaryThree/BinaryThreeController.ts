import { Request, Response } from "express";
import { BinaryTreeService } from "../../Services/BinaryTree/BinaryTreeService";
import { GetAllTreeService } from "../../Services/BinaryTree/GetAllTreeService";

const service = new BinaryTreeService();

export class BinaryTreeController {
  binaryTreeService: any;
  async addUser(req: Request, res: Response) {
    try {
      const { userId, sponsorId, position } = req.body;
      const node = await service.addUserToTree(userId, sponsorId, position);
      return res.status(201).json(node);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserTree(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const tree = await service.getUserTree(Number(userId));
      return res.json(tree);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserPosition(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const position = await service.getPosition(Number(userId));
      return res.json(position);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getTree(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      return res.status(400).json({ error: "userId deve ser um número válido." });
    }

    try {
      const children = await this.binaryTreeService.getTreeChildren(userIdNumber);

      return res.json({ children });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar a árvore." });
    }
  }

  async getEntireTree(req: Request, res: Response) {
    const service = new GetAllTreeService();
    try {
      const tree = await service.getEntireTree();
      return res.json(tree);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar a árvore" });
    }
  }

}
