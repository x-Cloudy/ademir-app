import { Request, Response } from "express";
import { MailService } from "../../Config/mail/MailService";
import { PasswordResetUseCase } from "../../Config/mail/token";
import prismaClient from "../../prisma";

export class PasswordResetController {
  constructor(
    private resetUseCase: PasswordResetUseCase,
    private mailService: MailService
  ) {}

  async requestReset(req: Request, res: Response) {
    const { email } = req.body;

    const user = await prismaClient.user.findUnique({
        where: {
          email: email,
        },
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }      

    const token = await this.resetUseCase.generateResetToken(user.id);

    await this.mailService.sendPasswordReset(email, token);

    return res.json({ message: "E-mail enviado para recuperação de senha." });
  }
}
