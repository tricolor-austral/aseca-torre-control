import { Injectable } from '@nestjs/common';
import { StockRepository } from './stock.repository';

@Injectable()
export class StockServices {
  constructor(private readonly stockRepository: StockRepository) {}

  async checkIfThereIsStock(id: string) {
    const stock: number = await this.stockRepository.getStockByProduct(id);
    return stock > 0;
  }
}
