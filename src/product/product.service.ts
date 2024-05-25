import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/CreateProductDto';
import { SupplierService } from '../supplier/supplier.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly supplierService: SupplierService,
  ) {}

  async createProduct(data: CreateProductDto) {
    return await this.productRepository.createProduct(data);
  }
  async getAllProducts() {
    return this.productRepository.findAll();
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
