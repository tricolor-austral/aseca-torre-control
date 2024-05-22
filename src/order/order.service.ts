import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(data: CreateOrderDto) {
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
