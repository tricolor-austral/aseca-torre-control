import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async getAllProducts() {
    return this.productRepository.findAll();
  }
  async checkIfThereIsStock(id: string) {
    return await this.productRepository.hasStock(id);
  }
  async substractStock(id: string) {
    if (!(await this.checkIfThereIsStock(id))) {
      return await this.productRepository.substractStock(id);
    }
  }

}
