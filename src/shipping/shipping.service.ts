import { Injectable } from '@nestjs/common';
import { ShippingDto } from './shippingDto';

@Injectable()
export class ShippingService {
  async sendOrder(shippingDto: ShippingDto) {
    console.log(JSON.stringify(shippingDto));
    fetch('https://37ea-200-85-126-66.ngrok-free.app/shipments', {
      method: 'POST',
      body: JSON.stringify(shippingDto),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
