import prismaClient from "../../prisma";

export class ChangePositionService {
    async execute(userId: number, position: string) {
        await prismaClient.user.updateMany({ where: { id: userId }, data: { sidePreference: position } });

        return position;
    }
}