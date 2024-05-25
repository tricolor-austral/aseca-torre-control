import { Product } from '@prisma/client';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  substractStock(id: string, qty: number): void;
  getStock(id: string): Promise<number>;
  //todo: add create product
}
