import { Request, Response } from "express";
import { MatrizService } from "../../Services/User/MatrizService";


export class MatrizController {
  async getIndicatedUsers(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: "userId é obrigatório" });
      }

      const service = new MatrizService();
      const indications = await service.findIndicatedUsers(Number(userId));

      return res.json(indications);
    } catch (error) {
      console.error("Erro ao buscar indicados:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
