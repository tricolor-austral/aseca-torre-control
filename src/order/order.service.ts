import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { StockRepository } from '../stock/stock.repository';
import { StockServices } from '../stock/stock.services';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly stockservices: StockServices,
  ) {}

  async createOrder(data: CreateOrderDto) {
    const productIds = data.productIds;
    for (const id in productIds) {
      await this.stockservices.restOneStock(id);
    }
    return await this.orderRepository.create(data);
  }

  async getOrders() {
    return await this.orderRepository.findAll();
  }

  async getOrderById(id: string) {
    return await this.orderRepository.findById(id);
  }

  async updateOrder(id: string, data: any) {
    return await this.orderRepository.update(id, data);
  }

  async deleteOrder(id: string) {
    return await this.orderRepository.delete(id);
  }
}
