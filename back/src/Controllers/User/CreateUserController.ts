import{Request, Response} from "express"
import { CreateUserService} from "../../Services/User/CreateUserService"
import { UserRequest } from "../../models/User/UserRequest"

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password, wallet, whatsapp, roles, indication,code }: UserRequest = request.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
          name,
          email,
          password,
          wallet,
          whatsapp,
          indication,
          roles,
          code
        });
        
        return response.json(user);
    }
}

export { CreateUserController }