import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {CreateProductDto} from "./dto/CreateProductDto";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: CreateProductDto) {
    return this.productRepository.createProduct(data);
  }
  async getAllProducts() {
    return this.productRepository.findAll();
  }
  async checkIfThereIsStock(id: string) {
    return await this.productRepository.hasStock(id);
  }
  async substractStock(id: string, qty: number) {
    if (!(await this.checkIfThereIsStock(id))) {
      return await this.productRepository.substractStock(id, qty);
    }
  }
}
