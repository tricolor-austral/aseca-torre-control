import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';
import { IorderRepository } from './IorderRepository';
import { OrderOutput } from './OrderOutput';

export class OrderRepositoryMock implements IorderRepository {
  private orders: Order[] = [];
  private nextId = '1';

  create(newOrder: CreateOrderDto): Promise<OrderOutput> {
    const newOrderWithId = { ...newOrder, id: this.nextId };
    this.orders.push(newOrderWithId);
    this.nextId = (BigInt(this.nextId) + BigInt(1)).toString();
    const orderOutput = {
      id: newOrderWithId.id,
      buyerId: newOrderWithId.buyerId,
      products: newOrderWithId.products,
    } as OrderOutput;
    return Promise.resolve(orderOutput);
  }



  findAll(): Promise<Awaited<Order[]>> {
    return Promise.resolve(this.orders);
  }
}

export const orderRepositoryMockProvider = {
  provide: OrderRepository,
  useClass: OrderRepositoryMock,
};
