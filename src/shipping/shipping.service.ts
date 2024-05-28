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

  async sendOrder() {
    const payload = null
    fetch('https://54bd-186-0-228-202.ngrok-free.app/shipments', { method: 'POST', body: JSON.stringify(payload) });
  }
}
