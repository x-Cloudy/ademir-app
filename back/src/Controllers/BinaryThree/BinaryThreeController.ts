import { Request, Response } from "express";
import { BinaryTreeService } from "../../Services/BinaryTree/BinaryTreeService";

const service = new BinaryTreeService();

export class BinaryTreeController {
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
}
