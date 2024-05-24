import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  public static async recieveNewOrder(orderId: string, buyerId: string) {
    const orderToShipping = {
      orderId: orderId,
      buyerId: buyerId,
    };
    //le mando a pepe
  }
}
