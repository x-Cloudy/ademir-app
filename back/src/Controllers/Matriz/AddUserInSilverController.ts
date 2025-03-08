import { Request, Response } from "express";
import { MatrizSilverService } from "../../Services/Matriz/MatrizSilverService";

export class AddUserInSilverController {

   async handle(request: Request, response: Response) {
        const indicateId = request.params.indicate;
        const indicatorId = request.params.indicator;

        const matrizSilverService = new MatrizSilverService();
        const user = await matrizSilverService.execute(indicatorId, indicateId);
        response.json(user);
    }
}