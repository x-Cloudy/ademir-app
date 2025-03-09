import { Request, Response } from "express";
import { MeService } from "../../Services/User/MeService";

export class MeController {
    async handle(req: Request, res: Response) {
        try {
            const userId = req.user_id;
            const meService = new MeService();
            const user = await meService.execute(userId);
            
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
