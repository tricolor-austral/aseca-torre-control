import { Injectable } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  //manejar el error cuando el proveedor no existe
  findSupplier(id: string) {
    return this.supplierRepository.getSupplierById(id.toString());
  }

  //falta manejar el error cuando el producto no tiene proveedores y cuando el producto no existe
  async findAllbyProduct(id: string) {
    return await this.supplierRepository.getSuppliersByProductId(id);
  }
  async createSupplier(data: CreateSupplierDto) {
    return await this.supplierRepository.createSupplier(data);
  }
}
