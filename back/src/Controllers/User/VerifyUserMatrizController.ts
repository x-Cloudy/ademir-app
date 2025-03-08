import { VerifyUserMatriz } from "../../Services/User/VerifyUserMatriz";
import { Request, Response } from "express";

export class VerifyUserMatrizController {

    async execute(request: Request, response: Response) {
        const userId = request.params.id;
        const verifyUserMatrizService = new VerifyUserMatriz();
        const user = await verifyUserMatrizService.execute(userId);
        if (user) {
            response.json({ message: "Usuário pertence a uma matriz." });
        } else {
            response.status(404).json({ message: "Usuário não pertence a uma matriz." });
        }
    }
}