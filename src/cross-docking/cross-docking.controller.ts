import {Body, Controller, Post} from "@nestjs/common";
import {CrossDockingService} from "./cross-docking.service";
import {ShippingDto} from "../shipping/shippingDto";

@Controller('cross-docking')
export class CrossDockingController {
    constructor(private service: CrossDockingService) {}
    @Post('delivered')
    async deliverToCrossDocking(@Body() shippingDto : ShippingDto) {
        console.log(shippingDto.orderID, shippingDto.buyerId)
        await this.service.sendOrderToShipping(shippingDto)
        return 'Order delivered to cross-docking';
    }


}