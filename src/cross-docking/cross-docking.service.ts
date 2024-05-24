import { Injectable } from '@nestjs/common';

import { SupplierService } from '../supplier/supplier.service';

@Injectable()
export class CrossDockingService {
  constructor(private supplierService: SupplierService) {}

  sendOrderToCrossDocking(orderDTO: {
    orderId: string;
    buyerId: string;
    productsId: Array<string>;
  }) {
    //ni idea esto corregilo
    const path = 'http://localhost:8081/cross-docking';
    const suppliersAndProducts = this.matchProductsToSuppliers(
      orderDTO.productsId,
    );
    const body = {
      orderId: orderDTO.orderId,
      buyerId: orderDTO.buyerId,
      suppliersAndProducts,
    };
    fetch(path, { method: 'POST' });
  }

  private matchProductsToSuppliers(
    productsId: Array<string>,
  ): Array<{ productId: string; supplierId: Promise<string> }> {
    const suppliersAndProducts = productsId.map((productId) => {
      return {
        productId,
        supplierId: this.supplierService.findAllbyProduct(productId),
      };
    });
    return suppliersAndProducts;
  }
}
