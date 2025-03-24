import { Request, Response } from "express";
import { AllUserService } from "../../Services/User/AllUserService";
import { ChangePassword } from "../../Services/User/ChangePassword";

class AllUserController {
        async handle(request: Request, response: Response) {
            const detailUserService = new AllUserService();
            const {whatsapp, name , nick } = request.body; // Correção na desestruturação
            const user = await detailUserService.execute({ whatsapp, name , nick}); // Passando os filtros
            return response.status(200).json(user);
        }
    

    async passwordChange(request: Request, response: Response) {
        const service = new ChangePassword();
        const {userId, password} = request.body;
        await service.handle(userId, password);
        return response.status(200).json("Senha alterada com sucesso!");
    }

    async indicators(request: Request, response:Response){
        const detailUserService = new AllUserService();
        const {code} = request.params;
        const user = await detailUserService.execute2(code);
        return response.status(200).json(user); 
    }
}

export { AllUserController };