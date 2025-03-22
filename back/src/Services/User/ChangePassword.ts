import { hash } from "bcryptjs";
import prismaClient from "../../prisma"

export class ChangePassword {
    async handle(userId: string, password : string) {
        const id = parseInt(userId, 10)

        const passwordHash = await hash(password, 8);

        await prismaClient.user.update({
            where:{
                id: id
            },
            data: {
                password : passwordHash
            }
        })

    }
}