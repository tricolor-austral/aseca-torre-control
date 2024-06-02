import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';
import { CrossDockingService } from '../cross-docking/cross-docking.service';
import { OrderRepository } from './order.repository';
import { STATUS } from '@prisma/client';
import { OrderOutput } from './dto/OrderOutput';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly crossDocking: CrossDockingService,
    private readonly productServices: ProductService,
  ) {}

  async createOrder(data: CreateOrderDto) {
    console.log(data.buyerId);
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
    // Step 3: Prepare the output
    const orderOutput = {
      id: order.id,
      buyerId: order.buyerId,
      products: [
        ...data.products.map((product) => ({
          productIds: product.productIds,
          name: product.name,
          qty: product.qty,
        })),
      ],
      status: order.status,
    } as OrderOutput;
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

    const orderDTO = {
      orderId: orderOutput.id,
      buyerId: orderOutput.buyerId,
      products: orderOutput.products,
    };
    try {
      await this.crossDocking.sendOrderToCrossDocking(orderDTO);
    } catch (e) {
      console.log('Error in crossDocking service');
    }
    return orderOutput;
  }

  async getOrders() {
    return await this.orderRepository.findAll();
  }

  async changeStatus(id: string, status: STATUS) {
    return await this.orderRepository.changeStatus(id, status);
  }
}
