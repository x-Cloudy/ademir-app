import { Request, Response } from "express";  // Certifique-se de importar Request e Response corretamente
import { TableTextService } from "../../Services/TableText/TableText";

export class TableTextController {

    async create(request: Request, response: Response): Promise<Response> {
        try {
            const text = request.body;

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

    async get(request: Request, response: Response): Promise<Response> {
        try {
            const id = request.params.id;

            const tableTextService = new TableTextService();
            const tableText = await tableTextService.executeGet(id);

            if (!tableText) {
                return response.status(404).json({
                    message: "Texto não encontrado"
                });
            }

            return response.status(200).json({
                message: "Texto encontrado com sucesso",
                data: tableText
            });
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao obter o texto",
                error: error.message
            });
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const id = request.params.id;

            const tableTextService = new TableTextService();
            const success = await tableTextService.executeDelete(id);

            if (!success) {
                return response.status(404).json({
                    message: "Texto não encontrado ou não pode ser deletado"
                });
            }

            return response.status(200).json({
                message: "Texto deletado com sucesso"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao deletar o texto",
                error: error.message
            });
        }
    }
}
