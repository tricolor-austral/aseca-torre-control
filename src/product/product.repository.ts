import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from './IproductRepository';
import {CreateProductDto} from "./dto/CreateProductDto";
@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.product.findMany();
  }

  async createProduct(data: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        id: data.productId,
        qty: data.qty,
        price: data.price,
        supplier: {
          connect: data.suppliers.map((supplier) => ({
            id: supplier,
          })),
        }
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
