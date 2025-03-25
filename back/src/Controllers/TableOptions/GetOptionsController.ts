import { TableOptionsService } from "../../Services/TableOptions/TableOptionsService"
import { Request, Response } from "express"; 

export class GetOptionsController {

    async get(response: Response){
        const service = new TableOptionsService();
       const dada =  await service.get();

        return response.status(200).json({
            data: dada
        })
    }

    async put(request: Request, response: Response) {
        try {
            // Passo 1: Obter dados do corpo da requisição
            const { wallet } = request.body;
            // Passo 3: Chamar o serviço de atualização
            const service = new TableOptionsService();
            const updatedData = await service.put(wallet);

            // Passo 4: Retornar resposta de sucesso
            return response.status(200).json(updatedData);

        } catch (error) {
            // Passo 5: Tratamento de erros
            return response.status(500).json({
                error: error.message || "Erro interno ao atualizar as opções"
            });
        }
    }

    async create(request: Request, response: Response) {
        try {
          const opcoesService = new TableOptionsService();
          
          // Cria o registro com wallet: false
          const novaOpcao = await opcoesService.create(true);
    
          return response.status(201).json(novaOpcao);
          
        } catch (error) {
          return response.status(500).json({
            error: error.message || 'Erro interno ao criar configuração'
          });
        }

    }
}