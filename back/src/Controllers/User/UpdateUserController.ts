import { Request, Response } from "express";
import { UpdateUserService } from "../../Services/User/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const user_id = request.params.id;
    const data = request.body;

    if (!data || Object.keys(data).length === 0) {
      return response.status(400).json({ error: "Nenhum dado para atualizar." });
    }

    const updateUserService = new UpdateUserService();

    try {
      const updatedUser = await updateUserService.execute({ user_id, data });
      return response.json(updatedUser);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido.";

      if (errorMessage === "Usuário não encontrado.") {
        return response.status(404).json({ error: errorMessage });
      }

      return response.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }
}

export { UpdateUserController };
