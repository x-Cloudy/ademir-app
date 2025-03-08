import { Request, Response } from "express";
import { AuthenticateUserService } from "../../Services/Auth/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService();

    try {
      const token = await authenticateUserService.execute({ email, password });
      return response.json(token);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido.";

      if (errorMessage === "Usuário não encontrado." || errorMessage === "Credenciais inválidas." || errorMessage === "Usuário não verificado.") {
        return response.status(401).json({ error: errorMessage });
      }

      return response.status(500).json({ error: "Erro ao autenticar usuário." });
    }
  }
}

export { AuthenticateUserController };
