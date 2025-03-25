import { Request, Response } from "express";
import { AllUserService } from "../../Services/User/AllUserService";
import { ChangePassword } from "../../Services/User/ChangePassword";

class AllUserController {
    async handle(request: Request, response: Response) {
        // Recebe o parâmetro de busca via query (como ?search=ademir)
        const search = request.query.search as string | undefined;
      
        // Parâmetros de paginação (ex: ?page=1&limit=10)
        const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 10;
        const skip = (page - 1) * limit;
      
        const detailUserService = new AllUserService();
        const users = await detailUserService.execute({ search, skip, limit });
      
        return response.status(200).json({
          page,
          limit,
          data: users
        });
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
        console.log("a" + code)
        const user = await detailUserService.execute2(code);
        return response.status(200).json(user); 
    }

    async indicator(request: Request, response:Response){
        const detailUserService = new AllUserService();
        const {userId} = request.params;
        const userIdNumber = parseInt(userId, 10);
        const user = await detailUserService.execute3(userIdNumber);
        return response.status(200).json(user);
    }
}

export { AllUserController };