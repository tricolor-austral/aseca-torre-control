import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.product.findMany();
  }

  async hasStock(id: string) {
    return this.prismaService.stock.findFirst({
      where: {
        productId: id,
        qty: {
          gt: 0,
        },
      },
    });
  }

}
