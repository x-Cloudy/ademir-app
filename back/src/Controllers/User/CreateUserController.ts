import { Request, Response } from "express";
import { CreateUserService } from "../../Services/User/CreateUserService";
import { UserRequest } from "../../models/User/UserRequest";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, wallet, whatsapp, roles, indication, code, nick, link }: UserRequest = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.createUser({
      name,
      email,
      password,
      wallet,
      whatsapp,
      indication,
      roles,
      code,
      nick,
      link
    });

    return response.status(200).json(user);
  }
}

export { CreateUserController };
