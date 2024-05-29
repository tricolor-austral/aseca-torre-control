import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderOutput } from './dto/OrderOutput';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateOrderDto): Promise<OrderOutput> {
    const order = await this.prisma.order.create({
      data: {
        Buyer: {
          create: {
            id: data.buyerId,
            name: "pepe",
          },
        },
        products: {
          createMany: {
            data: data.products.map((product) => ({
              productId: product.productIds,
              qtyBought: product.qty,
            })),
          },
        },
      },
      include: {
        products: true,
      },
    });
    const orderOutput = {
      id: order.id,
      buyerId: order.buyerId,
      products: data.products,
    } as OrderOutput;

    return orderOutput; // Se devuelve la orden creada junto con los productos asociados.
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
  async clear() {
    await this.prisma.order.deleteMany();
  }
}
