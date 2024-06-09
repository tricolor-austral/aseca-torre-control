import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderOutput } from './dto/OrderOutput';
import { Order, STATUS } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateOrderDto): Promise<Order> {
    // Step 1: Upsert the buyer
    const buyer = await this.prisma.buyer.upsert({
      where: { id: data.buyerId },
      update: {},
      create: {
        id: data.buyerId,
        name: 'pepe',
      },
    });

    // Step 2: Create the order
    const order = await this.prisma.order.create({
      data: {
        buyerId: buyer.id, // Reference the existing or newly created buyer.
        products: {
          createMany: {
            data: data.products.map((product) => ({
              productId: product.productIds,
              qtyBought: product.qty,
            })),
          },
        },
        status: STATUS.CROSSDOCKING,
      },
      include: {
        products: true,
      },
    });

    return order; // Return the created order along with the associated products.
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      orderId: order.id,
      status: order.status,
      products: order.products.map((op) => ({
        productIds: op.product.id,
        name: op.product.name,
        qtyBought: op.qtyBought,
      })),
    }));
  }

  async findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }
  async changeStatus(id: string, status: STATUS) {
    console.log('Changing status of order with id:', id, 'to:', status);
    return this.prisma.order.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
  }
}
