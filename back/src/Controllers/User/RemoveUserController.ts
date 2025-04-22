import { Request, Response } from "express";
import { RemoveUserService } from "../../Services/User/RemoveUserService";

class RemoveUserController {
  async handle(request: Request, response: Response) {

    const user_id = request.params.id;

    const removeUserService = new RemoveUserService();

      const removedUser = await removeUserService.execute({ user_id });
      return response.json(removedUser);
    
  }
}

export { RemoveUserController };
