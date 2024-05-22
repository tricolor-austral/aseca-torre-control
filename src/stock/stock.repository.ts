import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getStockByProduct(id: string): Promise<number> {
    try {
      const stock = await this.prismaService.stock.findFirst({
        where: { productId: id },
        select: { qty: true },
      });
      if (stock) {
        return stock.qty;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error(
        `Error fetching stock for product with id ${id}: ${error.message}`,
      );
    }
  }
}
