import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthenticateUserService {
  async execute({ email, password }: { email: string; password: string }) {
    // Verifica se o usuário existe
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Compara a senha fornecida com a senha criptografada do banco
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Credenciais inválidas.");
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { token };
  }
}

export { AuthenticateUserService };
