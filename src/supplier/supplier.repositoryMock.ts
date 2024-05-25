import { SupplierRepository } from './supplier.repository';
import { Supplier } from '@prisma/client';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ProductRepository } from '../product/product.repository';
import { ProductRepositoryMock } from '../product/product.repositoryMock';

export class SupplierRepositoryMock extends SupplierRepository {
  private supplier: Supplier[] = [];
  private nextId = '1';
  async getSupplierById(id: string) {
    return this.supplier.find((supplier) => supplier.id === id);
  }

  async createSupplier(data: CreateSupplierDto) {
    const newSupplier = { ...data, id: this.nextId };
    this.supplier.push(newSupplier);
    this.nextId = (BigInt(this.nextId) + BigInt(1)).toString();
    return Promise.resolve(newSupplier);
  }
  async clear() {
    this.supplier = [];
    this.nextId = '1';
  }
}

export const supplierRepositoryMockProvider = {
  provide: SupplierRepository,
  useClass: SupplierRepositoryMock,
};
