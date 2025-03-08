import { response } from "express";
import { TopIndicatesService } from "../../Services/Matriz/TopIndicatesService";

export class TopAllIndicatesController {

    service = new TopIndicatesService();

    async top10() {
        const top = await this.service.top10();
        return response.json(top);
    }

    async top3() {
        const top = await this.service.top3();
        return response.json(top);
    }

    async top1() {
        const top = await this.service.top1();
        return response.json(top);
    }
}