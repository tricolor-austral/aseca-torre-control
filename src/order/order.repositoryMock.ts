import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

export class OrderRepositoryMock {
  private orders: Order[] = [];
  private nextId = '1';

  create(newOrder: CreateOrderDto): Promise<Order> {
    const newOrderWithId = { ...newOrder, id: this.nextId };
    this.orders.push(newOrderWithId);
    this.nextId = (BigInt(this.nextId) + BigInt(1)).toString();
    return Promise.resolve(newOrderWithId);
  }

  findAll(): Promise<Awaited<Order[]>> {
    return Promise.resolve(this.orders);
  }
}

export const orderRepositoryMockProvider = {
  provide: OrderRepository,
  useClass: OrderRepositoryMock,
};
