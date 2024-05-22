import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { StockServices } from '../stock/stock.services';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly stockServices: StockServices,
  ) {}
  async getAllProducts() {
    return this.productRepository.findAll();
  }
  async checkIfThereIsStock(id: string) {
    return await this.stockServices.checkIfThereIsStock(id);
  }
}
