import prisma from "../../prisma";

export class TableOptionsService {

    async create($data: boolean){
        const create = await prisma.opcoes.createMany({
            data: {
                wallet:$data
            }
        })
        return create;
    }


    async get(){
        const data = await prisma.opcoes.findMany({});
        return data;
    }

    async put(wallet: boolean) {
        // Atualiza o registro com id = 1
        const update = await prisma.opcoes.update({
            where: { id: 1 }, // Filtra pelo ID
            data: { wallet: wallet } // Novo valor
        });
        
        return update;
    }
    
}