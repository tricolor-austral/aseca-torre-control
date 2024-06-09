import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';
import { CrossDockingService } from '../cross-docking/cross-docking.service';
import { OrderRepository } from './order.repository';
import { STATUS } from '@prisma/client';
import { OrderOutput } from './dto/OrderOutput';

@Injectable()
export class OrderService {
  private statusMap: Map<STATUS, bigint> = new Map([
    [STATUS.CROSSDOCKING, 1n],
    [STATUS.NEW, 2n],
    [STATUS.PROGRESS, 3n],
    [STATUS.DELIVERED, 4n],
  ]);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly crossDocking: CrossDockingService,
    private readonly productServices: ProductService,
  ) {}

  async createOrder(data: CreateOrderDto) {
    if (!data.products.length) {
      throw new Error('No hay productos en la orden');
    }
    if (!data.buyerId) {
      throw new Error('No hay un comprador');
    }
    for (const product of data.products) {
      if (await this.productServices.getProductById(product.productIds)) {
        const qty = await this.productServices.checkIfThereIsStock(
          product.productIds,
          product.qty,
        );
        if (!qty) {
          throw new Error('No hay stock suficiente');
        }
      } else {
        throw new Error('Product not found');
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
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new HttpException('Order not found', 404);
    }
    const currentStatus: bigint = this.statusMap.get(order.status);
    if (this.statusMap.get(status) === currentStatus + 1n) {
      return await this.orderRepository.changeStatus(id, status);
    } else {
      throw new HttpException('Unavailable to change status', 400);
    }
  }
}
