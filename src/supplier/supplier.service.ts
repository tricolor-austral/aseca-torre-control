import { Injectable } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}
  findSupplier(id: string) {
    return this.supplierRepository.getSupplierById(id.toString());
  }

  findAllbyProduct(id: string) {
    return this.supplierRepository.getSuppliersByProductId(id);
  }
}
