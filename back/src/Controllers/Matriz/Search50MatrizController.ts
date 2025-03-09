import { Request, Response } from "express";
import { Search50MatrizService } from "../../Services/Matriz/Seach50MatrizService";

export class Search50MatrizController {
  async getNextOrders(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: "userId é obrigatório" });
      }

      const service = new Search50MatrizService();
      const nextOrders = await service.findNextOrders(Number(userId));

      return res.json(nextOrders);
    } catch (error) {
      console.error("Erro ao buscar próximos usuários:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
