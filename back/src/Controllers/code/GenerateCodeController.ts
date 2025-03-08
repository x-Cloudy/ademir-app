import { GenerateCodeService } from "../../Services/code/GenerateCodeService";
import { Request, Response } from "express";
export class GenerateCodeController {
    private generateCodeService = new GenerateCodeService();

    public generateInviteCode(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
    
            if (!userId) {
                return res.status(400).json({ error: "userId não fornecido" });
            }
    
            const inviteCode = this.generateCodeService.generateInviteCode(userId);
            res.json({ inviteCode });
        } catch (error) {
            console.error("Erro ao gerar código de convite:", error);
            res.status(500).json({ error: "Erro ao gerar código de convite." });
        }
    }
    

    public decodeInviteCode(req: Request, res: Response) {
        try {
            const inviteCode = req.params.inviteCode;
            const userId = this.generateCodeService.decodeInviteCode(inviteCode);
            res.json({ userId });
        } catch (error) {
            console.error("Erro ao decodificar código de convite:", error);
            res.status(500).json({ error: "Erro ao decodificar código de convite." });
        }
    }
}