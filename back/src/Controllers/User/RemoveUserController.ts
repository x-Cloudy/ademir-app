import { Request, Response } from "express";
import { RemoveUserService } from "../../Services/User/RemoveUserService";

class RemoveUserController {
  async handle(request: Request, response: Response) {

    const user_id = request.params.id;

    if (!user_id || isNaN(Number(user_id))) {
      return response.status(400).json({ error: "ID de usuário inválido." });
    }

    const removeUserService = new RemoveUserService();

    try {
      const removedUser = await removeUserService.execute({ user_id });
      return response.json(removedUser);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido.";

      if (errorMessage === "Usuário não encontrado.") {
        return response.status(404).json({ error: errorMessage });
      }

      return response.status(500).json({ error: "Erro ao remover usuário." });
    }
  }
}

export { RemoveUserController };
