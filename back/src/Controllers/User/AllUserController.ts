import { Request, Response } from "express";
import { AllUserService } from "../../Services/User/AllUserService";

class AllUserController {
    async handle(request: Request, response: Response) { // Recebe request e response
        const detailUserService = new AllUserService();
        const user = await detailUserService.execute();
        return response.status(200).json(user); // Agora response está correto
    }

    async handle2() {
        // Lógica adicional
    }
}

export { AllUserController };