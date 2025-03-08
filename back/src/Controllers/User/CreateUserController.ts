import{Request, Response} from "express"
import { CreateUserService} from "../../Services/User/CreateUserService"
import { UserRequest } from "../../models/User/UserRequest"

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password, wallet, whatsapp }: UserRequest = request.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
          name,
          email,
          password,
          wallet,
          whatsapp
        });
        
        return response.json(user);
    }
}

export { CreateUserController }