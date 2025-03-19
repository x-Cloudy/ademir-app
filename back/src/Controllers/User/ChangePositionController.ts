import { ChangePositionService } from "../../Services/User/ChangePositionService";
import { Request, Response } from "express";

export class ChangePositionController {

    async handle(request: Request, response: Response) {
        const user_id = request.params.id as unknown as number;
        const position = request.params.position;

        const changePositionService = new ChangePositionService();
        const user = await changePositionService.execute(user_id, position);
        return response.status(200).json(user);
    }
}