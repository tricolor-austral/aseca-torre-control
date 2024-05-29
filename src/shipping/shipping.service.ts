import { Injectable } from '@nestjs/common';
import { ShippingDto } from './shippingDto';

@Injectable()
export class ShippingService {
  async sendOrder(shippingDto: ShippingDto) {
    console.log(JSON.stringify(shippingDto));
    fetch('https://92a9-200-114-149-37.ngrok-free.app/shipments', {
      method: 'POST',
      body: JSON.stringify(shippingDto),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
