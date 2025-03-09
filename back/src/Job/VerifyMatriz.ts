import cron from 'node-cron';
import  prisma  from "../prisma";

export class VerifyMatriz {
    async reorganizarCooper() {
        console.log('Reorganizando IDs...');

        const registros = await prisma.matrizCooper.findMany({
            orderBy: { id: 'asc' }
        });

        for (let i = 0; i < registros.length; i++) {
            await prisma.matrizSilver.update({
                where: { id: registros[i].id },
                data: { order: i + 1 }
            });
        }
    }
    async reorganizarSilver() {
        console.log('Reorganizando IDs...');

        const registros = await prisma.matrizSilver.findMany({
            orderBy: { id: 'asc' }
        });

        for (let i = 0; i < registros.length; i++) {
            await prisma.matrizSilver.update({
                where: { id: registros[i].id },
                data: { order: i + 1 }
            });
        }
    }
    async reorganizarGold() {
        console.log('Reorganizando IDs...');

        const registros = await prisma.matrizGold.findMany({
            orderBy: { id: 'asc' }
        });

        for (let i = 0; i < registros.length; i++) {
            await prisma.matrizGold.update({
                where: { id: registros[i].id },
                data: { order: i + 1 }
            });
        }
    }
}

const verifyMatriz = new VerifyMatriz();

cron.schedule('*/10 * * * *', async () => {
    await verifyMatriz.reorganizarCooper();
    await verifyMatriz.reorganizarSilver();
    await verifyMatriz.reorganizarGold();
});
