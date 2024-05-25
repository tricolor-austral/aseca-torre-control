import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/CreateProductDto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: CreateProductDto) {
    return this.productRepository.createProduct(data);
  }
  async getAllProducts() {
    return this.productRepository.findAll();
  }
  async checkIfThereIsStock(id: string, qty: number) {
    const stock = await this.productRepository.getStock(id);
    return stock > qty;
  }
  async substractStock(id: string, qty: number) {
    if(await this.checkIfThereIsStock(id, qty)) {
      return await this.productRepository.substractStock(id, qty);
    }
    else{
      throw new Error(`Insufficient stock for product ${id}. Requested: ${qty}`);
    }
  }
}
