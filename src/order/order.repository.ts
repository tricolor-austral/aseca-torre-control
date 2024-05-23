import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        buyerId: data.buyerId,
        products: {
          connect: data.productIds.map((id) => ({ id })),
        },
      },
    });
    return order;
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
