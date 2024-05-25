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
    const stock = await this.productRepository.getStock(id);
    return stock > 0;
  }
  async substractStock(id: string, qty: number) {
    // CORREGIR: chequeamos si hay stock pero la cantidad a restar puede ser mayor a la cantidad en stock
    if (!(await this.checkIfThereIsStock(id))) {
      return await this.productRepository.substractStock(id, qty);
    }
  }
}
