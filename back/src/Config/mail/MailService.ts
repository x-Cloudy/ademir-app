import nodemailer from "nodemailer";

export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendPasswordReset(email: string, token: string) {
    const resetLink = `site=${token}`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Recuperação de Senha",
      html: `<p>Olá,</p>
             <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefini-la:</p>
             <a href="${resetLink}">Redefinir Senha</a>
             <p>Se você não solicitou essa recuperação, ignore este e-mail.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
