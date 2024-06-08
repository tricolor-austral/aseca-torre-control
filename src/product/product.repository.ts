import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProductDto';

@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.product.findMany();
  }
  async addStock(id: string, qty: number) {
    return this.prismaService.product.update({
      where: {
        id: id,
      },
      data: {
        qty: {
          increment: qty,
        },
      },
    });
  }
  async createProduct(data: CreateProductDto) {
    console.log(data.qty, data.price);

    // Dividir el string de suppliers por comas y eliminar espacios en blanco adicionales
    const supplierNames = data.supplierName
      .split(',')
      .map((name) => name.trim());

    const suppliers = await this.prismaService.supplier.findMany({
      where: {
        name: {
          in: supplierNames,
        },
      },
    });

    if (suppliers.length !== supplierNames.length) {
      throw new Error(`One or more suppliers not found`);
    }

    return this.prismaService.product.create({
      data: {
        name: data.name,
        qty: data.qty,
        price: data.price,
        supplier: {
          connect: suppliers.map((supplier) => ({ id: supplier.id })),
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id: id,
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
