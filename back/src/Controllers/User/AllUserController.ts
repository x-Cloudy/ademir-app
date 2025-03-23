import { Request, Response } from "express";
import { AllUserService } from "../../Services/User/AllUserService";

class AllUserController {
    async handle(request: Request, response: Response) {
        const detailUserService = new AllUserService();
        const user = await detailUserService.execute();
        return response.status(200).json(user);
    }

    async handle2() {
    }
}

export { AllUserController };