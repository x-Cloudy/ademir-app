import { Request, Response } from "express";
import { IndicateNomineeService } from "../../Services/Matriz/IndicateNomineeService";

export class IndicateNomineeController {
  async getByDateRange(req: Request, res: Response) {
    try {
      const { dateStart, dateEnd } = req.query;

      if (!dateStart || !dateEnd) {
        return res.status(400).json({ error: "dateStart e dateEnd são obrigatórios" });
      }

      const service = new IndicateNomineeService();
      const nominees = await service.findBetweenDates(dateStart as string, dateEnd as string);

      return res.json(nominees);
    } catch (error) {
      console.error("Erro ao buscar indicações:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
