import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProductDto';
@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.product.findMany();
  }

  async createProduct(data: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        qty: data.qty,
        price: data.price,
      },
    });
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
  async getStock(id: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        id: id,
        qty: {
          gt: 0,
        },
      },
    });
    return Promise.resolve(product.qty);
  }
  async clear() {
    await this.prismaService.product.deleteMany();
  }
}
