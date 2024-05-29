import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderOutput } from './dto/OrderOutput';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateOrderDto): Promise<OrderOutput> {
    // Step 1: Upsert the buyer
    const buyer = await this.prisma.buyer.upsert({
      where: { id: data.buyerId },
      update: {}, // Assuming no fields to update, otherwise specify the fields to update here.
      create: {
        id: data.buyerId,
        name: "pepe", // Replace with data from CreateOrderDto if needed.
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
      },
      include: {
        products: true,
      },
    });

    // Step 3: Prepare the output
    const orderOutput = {
      id: order.id,
      buyerId: order.buyerId,
      products: data.products,
    } as OrderOutput;

    return orderOutput; // Return the created order along with the associated products.
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
