import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SupplierRepository {
  constructor(private prismaService: PrismaService) {}

  async getSupplierById(id: string) {
    return this.prismaService.supplier.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getSuppliersByProductId(id: string) {
    const supplier = await this.prismaService.supplier.findFirst({
      where: {
        products: {
          some: {
            id,
          },
        },
      },
    });
    return supplier.id;
  }
}
