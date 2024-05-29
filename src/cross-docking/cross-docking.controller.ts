import { Body, Controller, Post } from '@nestjs/common';
import { CrossDockingService } from './cross-docking.service';
import { CreateShipementDto } from '../shipping/dtos/CreateShipementDto';

@Controller('cross-docking')
export class CrossDockingController {
  constructor(private service: CrossDockingService) {}
  @Post('delivered')
  async deliverToCrossDocking(@Body() shippingDto: CreateShipementDto) {
    console.log(shippingDto.orderID);
    await this.service.sendOrderToShipping(shippingDto);
    return 'Order delivered to cross-docking';
  }
}
