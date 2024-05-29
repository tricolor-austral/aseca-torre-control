import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  async recieveNewOrder(orderId: string, buyerId: string) {
    const orderToShipping = {
      orderID: orderId,
      buyerId: buyerId,
    };
    await fetch('http://localhost:8888/shipments', {
      method: 'POST',
      body: JSON.stringify(orderToShipping),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendOrder() {
    const payload = null;
    fetch('https://54bd-186-0-228-202.ngrok-free.app/shipments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}
