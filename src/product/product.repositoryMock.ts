import { Product } from '@prisma/client';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/CreateProductDto';

export class ProductRepositoryMock extends ProductRepository {
  private products: Product[] = [];
  private suppliers: string[] = ['apple'];
  private nextId = '1';

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
  createProduct(data: CreateProductDto): Promise<Product> {
    const newProductwithID = { ...data, id: this.nextId };
    const supplierNames = data.supplierName
      .split(',')
      .map((name) => name.trim());
    for (const supplier of supplierNames) {
      if (!this.suppliers.includes(supplier)) {
        throw new Error('Supplier not found');
      }
    }
    this.products.push(newProductwithID);
    this.nextId = (BigInt(this.nextId) + BigInt(1)).toString();
    return Promise.resolve(newProductwithID);
  }

  findOne(id: string): Promise<Product | null> {
    return new Promise((resolve) => {
      const product =
        this.products.find((product) => product.id === id) || null;
      resolve(product);
    });
  }
  substractStock(id: string, qty: number) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      product.qty -= qty;
    }
    return Promise.resolve(product);
  }

  getStock(id: string) {
    return Promise.resolve(
      this.products.find((product) => product.id === id).qty,
    );
  }
}
