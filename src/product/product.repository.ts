import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.product.findMany();
  }

  async substractStock(id: string, qty: number) {
    return this.prismaService.product.update({
      where: {
        id: id,
      },
      data: {
        qty: {
          decrement: qty,
        },
      },
    });
  }
  async hasStock(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id: id,
        qty: {
          gt: 0,
        },
      },
    });
  }
}
