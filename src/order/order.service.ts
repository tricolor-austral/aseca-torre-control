import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';
import { ShippingService } from '../shipping/shipping.service';
import { CrossDockingService } from '../cross-docking/cross-docking.service';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly crossDocking: CrossDockingService,
    private readonly productServices: ProductService,
    private readonly shippingService: ShippingService,
  ) {}

  async createOrder(data: CreateOrderDto) {
    console.log(data.buyerId)
    if (!data.products.length) {
      throw new Error('No hay productos en la orden');
    }
    if (!data.buyerId) {
      throw new Error('No hay un comprador');
    }
    for (const product of data.products) {
      const qty = await this.productServices.checkIfThereIsStock(
        product.productIds,
        product.qty,
      );
      if (!qty) {
        throw new Error('No hay stock suficiente');
      }
    }
    const order = await this.orderRepository.create(data);
    if (order) {
      for (const product of data.products) {
        await this.productServices.substractStock(
          product.productIds,
          product.qty,
        );
      }
    } else {
      throw new Error('No se pudo crear la orden');
    }
    //le mando al shipping que reciba la orden,
    //le mando al cross docking {orderDTO}
    console.log("shipping");
  //await ShippingService.recieveNewOrder(order.id, order.buyerId);
    const orderDTO = {
      orderId: order.id,
      buyerId: order.buyerId,
      productsId: order.products.map((product) => product.productIds),
    };
    await this.crossDocking.sendOrderToCrossDocking(orderDTO);
    return order;
  }

  async getOrders() {
    return await this.orderRepository.findAll();
  }
}
