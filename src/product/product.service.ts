import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/CreateProductDto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: CreateProductDto) {
    return await this.productRepository.createProduct(data);
  }
  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async addStock(id: string, qty: number) {
    return await this.productRepository.addStock(id, qty);
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async checkIfThereIsStock(id: string, qty: number) {
    const stock = await this.productRepository.getStock(id);
    return stock > qty;
  }
  async substractStock(id: string, qty: number) {
    if (await this.checkIfThereIsStock(id, qty)) {
      return await this.productRepository.substractStock(id, qty);
    } else {
      throw new Error(
        `Insufficient stock for product ${id}. Requested: ${qty}`,
      );
    }
  }
}
