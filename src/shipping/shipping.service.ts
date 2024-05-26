import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  public static async recieveNewOrder(orderId: string, buyerId: string) {
    const orderToShipping = {
      orderID: orderId,
      buyerId: buyerId,
    };
    await fetch('http://localhost:8888/shipments',
      {
        method: 'POST',
        body: JSON.stringify(orderToShipping),
        headers: {
          'Content-Type': 'application/json',
        },
      },);
  }
}
