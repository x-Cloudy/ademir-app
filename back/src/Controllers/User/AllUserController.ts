import { Request, Response } from "express";
import { AllUserService } from "../../Services/User/AllUserService";
import { ChangePassword } from "../../Services/User/ChangePassword";

class AllUserController {
    async handle(request: Request, response: Response) {
        const detailUserService = new AllUserService();
        const user = await detailUserService.execute();
        return response.status(200).json(user);
    }

    async passwordChange(request: Request, response: Response) {
        const service = new ChangePassword();
        const {userId, password} = request.body;
        await service.handle(userId, password);
        return response.status(200).json("Senha alterada com sucesso!");
    }
}

export { AllUserController };