import { Request, Response } from "express";
import { MatrizCooperService } from "../../Services/Matriz/MatrizCooperService";

export class AddUserInCooperController {

   async handle(request: Request, response: Response) {
        const indicateId = request.params.indicate;
        const indicatorId = request.params.indicator;

        const matrizCooperService = new MatrizCooperService();
        const user = await matrizCooperService.execute(indicatorId, indicateId);
        response.json(user);
    }
}