import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";

export function isAuthenticated(
    request: Request, response: Response, next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authToken.split(" ");

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as { userId: string };

        if (!decoded.userId) {
            throw new Error("Token inválido");
        }

        request.user_id = decoded.userId;
        return next();
    } catch (error) {
        return response.status(401).json({ error: "Token inválido" });
    }
}
