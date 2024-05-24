import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderOutput } from './OrderOutput';

export interface IorderRepository {
  create(newOrder: CreateOrderDto): Promise<OrderOutput>;
  findAll(): Promise<Awaited<Order[]>>;
}
