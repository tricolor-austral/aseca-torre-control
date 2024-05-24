import { Product } from '@prisma/client';
import { ProductRepository } from './product.repository';

export class ProductRepositoryMock {
  private products: Product[] = [];
  private nextId = '1';

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
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
