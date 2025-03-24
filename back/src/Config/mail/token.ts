import jwt from "jsonwebtoken";

export class PasswordResetUseCase {
  async generateResetToken(userId: string | number) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "5m",
    });
  }
}
