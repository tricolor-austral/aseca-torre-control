import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  public static async recieveNewOrder(orderId: string, buyerId: string) {
    const orderToShipping = {
      orderId: orderId,
      buyerId: buyerId,
    };
    fetch('https://localhost:8080', { method: 'POST' });
  }
}
