import { Request, Response } from "express";
import { IndicationsService } from "../../Services/User/IndicationsService";

export class IndicationsController {
  private indicationsService: IndicationsService;

  constructor() {
    this.indicationsService = new IndicationsService();
  }

  async getIndications(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId || isNaN(Number(userId))) {
        return res.status(400).json({ error: "User ID inválido" });
      }

      const indicatedUsers = await this.indicationsService.getIndicatedUsers(Number(userId));

      return res.json(indicatedUsers);
    } catch (error) {
      console.error("Erro ao buscar indicações:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
