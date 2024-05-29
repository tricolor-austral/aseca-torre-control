import { Body, Controller, Get, Put } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ChangeStatusDto } from './dtos/ChangeStatusDto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Put()
  async changeStatus(@Body() data: ChangeStatusDto) {
    return this.shippingService.changeStatus(data);
  }
  @Get()
  async createShipement() {
    return this.shippingService.getAllShippements();
  }
}
