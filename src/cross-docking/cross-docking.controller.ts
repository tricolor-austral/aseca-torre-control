import {Controller, Post} from "@nestjs/common";
import {CrossDockingService} from "./cross-docking.service";

@Controller('cross-docking')
export class CrossDockingController {
    constructor(private service: CrossDockingService) {}
    @Post('delivered')
    async deliverToCrossDocking() {
        await this.service.sendOrderToShipping()
        return 'Order delivered to cross-docking';
    }


}