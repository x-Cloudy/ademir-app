import {Request, Response} from "express"
import { AllUserService } from "../../Services/User/AllUserService";

class AllUserController{

    async handle( response:Response){
        const detailUserService = new AllUserService();
        const user = await detailUserService.execute();
        response.json(user);

 }

    async handle2(){

    }
}
export {AllUserController};