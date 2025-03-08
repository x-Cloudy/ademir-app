import { Request, Response } from "express";
import { MatrizGoldService } from "../../Services/Matriz/MatrizGoldService";

export class AddUserInGoldController {

   async handle(request: Request, response: Response) {
        const indicateId = request.params.indicate;
        const indicatorId = request.params.indicator;

        const matrizGoldService = new MatrizGoldService();
        const user = await matrizGoldService.execute(indicatorId, indicateId);
        response.json(user);
    }
}