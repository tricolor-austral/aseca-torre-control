import { Product } from '@prisma/client';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  substractStock(id: string, qty: number): void;
  hasStock(id: string): Promise<boolean>;
  //todo: add create product
}
