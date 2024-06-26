import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateShipementDto } from './dtos/CreateShipementDto';
import { OrderService } from '../order/order.service';
import { STATUS } from '@prisma/client';

@Injectable()
export class ShippingService {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}
  async sendOrder(shippingDto: CreateShipementDto) {
    await this.orderService.changeStatus(shippingDto.orderID, STATUS.NEW);
    console.log(JSON.stringify(shippingDto));
    fetch('https://c5ab-24-232-109-150.ngrok-free.app/shipments', {
      method: 'POST',
      body: JSON.stringify(shippingDto),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
