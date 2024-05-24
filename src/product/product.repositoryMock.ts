import { Product } from '@prisma/client';
import { ProductRepository } from './product.repository';
import {CreateProductDto} from "./dto/CreateProductDto";

export class ProductRepositoryMock {
  private products: Product[] = [];
  private nextId = '1';

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  createProduct(data: CreateProductDto): Promise<Product> {
    const newProductwithID = { ...data, id: this.nextId };
    this.products.push(newProductwithID);
    this.nextId = (BigInt(this.nextId) + BigInt(1)).toString();
    return Promise.resolve(newProductwithID);
  }

  substractStock(id: string, qty: number) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      product.qty -= qty;
    }
  }

  hasStock(id: string) {
    const product = this.products.find((product) => product.id === id);
    return Promise.resolve(product?.qty > 0);
  }
}

export const orderRepositoryMockProvider = {
  provide: ProductRepository,
  useClass: ProductRepositoryMock,
};
