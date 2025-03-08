import prismaClient from "../../prisma";

export class AllUserService {
    async execute() {
        const users = await prismaClient.user.findMany({});
        return users;
    }
}