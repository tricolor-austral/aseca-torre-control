import { Product } from '@prisma/client';
import { ProductRepository } from './product.repository';
import { IProductRepository } from './IproductRepository';
import {CreateProductDto} from "./dto/CreateProductDto";

export class ProductRepositoryMock implements IProductRepository {
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

  getStock(id: string) {
    return  Promise.resolve(this.products.find((product) => product.id === id).qty);
  }
}

export const orderRepositoryMockProvider = {
  provide: ProductRepository,
  useClass: ProductRepositoryMock,
};
