import cron from 'node-cron';
import prisma from '../prisma';

export class GetAllUser {
    async get() {
        const registros = await prisma.user.findMany({
            orderBy: { id: 'asc' }
        });
        return registros;
    }

    constructor() {
        cron.schedule('*/10 * * * *', async () => {
            const users = await this.get();
        });
    }
}

new GetAllUser();
