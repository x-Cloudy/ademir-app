import { Request, Response } from "express";  // Certifique-se de importar Request e Response corretamente
import { TableTextService } from "../../Services/TableText/TableText";

export class TableTextController {

    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { text } = request.body;

            const tableTextService = new TableTextService();
            const tableText = await tableTextService.execute(text);

            return response.status(201).json({ 
                message: "Texto criado com sucesso", 
                data: tableText 
            });
        } catch (error) {
            return response.status(500).json({ 
                message: "Erro ao criar o texto", 
                error: error.message 
            });
        }
    }

    async get(response: Response): Promise<Response> {
        try {
            const tableTextService = new TableTextService();
            const tableTexts = await tableTextService.executeGet(); // Chamando o método

            return response.status(200).json({
                data: tableTexts
            });
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar textos",
                error: error.message
            });
        }
    }

    // No TableTextController
    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const tableTextService = new TableTextService();
            await tableTextService.executeDelete(id);

            return response.status(200).json({
                message: "Texto deletado com sucesso"
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return response.status(404).json({
                    message: "Texto não encontrado"
                });
            }
            return response.status(500).json({
                message: "Erro ao deletar o texto",
                error: error.message
            });
        }
    }
}
