import { Request, Response } from "express";
import { MailService } from "../../Config/mail/MailService";
import prismaClient from "../../prisma";
MailService

export class PasswordResetController {
  private mailService: MailService;

  constructor() {
    this.mailService = new MailService();
  }

  async sendPasswordReset(req: Request, res: Response) {
    const { email, name } = req.body;

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!userAlreadyExists) {
      throw new Error("Email não cadastrado.");
    }

    try {
      await this.mailService.sendPasswordReset(email);
      return res.status(200).json({ message: "Código de recuperação enviado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao enviar código de recuperação." });
    }
  }

  async verifyCode(req: Request, res: Response) {
  const { email, code } = req.body;

  try {
    const user = await prismaClient.user.findFirst({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isValid = await this.mailService.verifyCode(email, code);

    if (isValid) {
      return res.status(200).json({id: user.id });
    } else {
      return res.status(400).json({ message: "Código inválido ou expirado." });
    }
  } catch (error) {
    console.error("Erro ao verificar código:", error);
    return res.status(500).json({ message: "Erro interno ao verificar o código." });
    }
  }
}
