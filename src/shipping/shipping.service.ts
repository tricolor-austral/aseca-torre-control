import { Injectable } from '@nestjs/common';
import { CreateShipementDto } from './dtos/CreateShipementDto';

@Injectable()
export class ShippingService {
  constructor() {}
  async sendOrder(shippingDto: CreateShipementDto) {
    console.log(JSON.stringify(shippingDto));
    fetch('https://37ea-200-85-126-66.ngrok-free.app/shipments', {
      method: 'POST',
      body: JSON.stringify(shippingDto),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
