import { Request, Response } from "express";
import { BinaryTreeService } from "../../Services/BinaryTree/BinaryTreeService";
import { GetAllTreeService } from "../../Services/BinaryTree/GetAllTreeService";
import { GetTreeChildren } from "../../Services/BinaryTree/GetTreeChildren";

export class BinaryTreeController {
  private service: BinaryTreeService;
  private allTreeService: GetAllTreeService;
  private getTreeChildren : GetTreeChildren;

  constructor() {
    this.service = new BinaryTreeService();
    this.allTreeService = new GetAllTreeService();
    this.getTreeChildren = new GetTreeChildren();
  }

  async addUser(req: Request, res: Response) {
    try {
      const { code, indicate} = req.body;
      const node = await this.service.addUserToTree(code, indicate);
      return res.status(201).json(node);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserTree(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const tree = await this.service.getUserTree(Number(userId));
      return res.json(tree);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserPosition(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const position = await this.service.getPosition(Number(userId));
      return res.json(position);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getTree(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const userIdNumber = parseInt(userId, 10);
      if (isNaN(userIdNumber)) {
        return res.status(400).json({ error: "userId deve ser um número válido." });
      }

      const children = await this.getTreeChildren.getTreeChildren(userIdNumber);
      return res.json({ children });
    } catch (error) {
      return res.status(404).json({ error: "Árvore vazia." });
    }
  }

  async getEntireTree(req: Request, res: Response) {
    try {
      const tree = await this.allTreeService.getEntireTree();
      return res.json(tree);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar a árvore" });
    }
  }
}
