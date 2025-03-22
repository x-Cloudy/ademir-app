import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  private loadTemplate(templateName: string, variables: Record<string, string>): string {
    const filePath = path.join(__dirname, "templates", `${templateName}.html`);
    const templateFile = fs.readFileSync(filePath, "utf-8");
    const template = handlebars.compile(templateFile);
    return template(variables);
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendPasswordReset(email: string) {
    const code = this.generateCode();

    await prisma.password_reset_tokens.upsert({
      where: { email },
      update: { token: code },
      create: { email, token: code },
    });

    const htmlContent = this.loadTemplate("password_reset", { code });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Recuperação de Senha",
      html: htmlContent,
      headers: {
        'X-Priority': '1', 
        'Priority': 'Urgent',
        'Importance': 'high'
    }
    };

    await this.transporter.sendMail(mailOptions);
  }

  async verifyCode(email: string, providedCode: string): Promise<boolean> {
    const tokenEntry = await prisma.password_reset_tokens.findUnique({ where: { email } });

    if (!tokenEntry || tokenEntry.token !== providedCode) return false;

    await prisma.password_reset_tokens.delete({ where: { email } });

    return true;
  }
}
