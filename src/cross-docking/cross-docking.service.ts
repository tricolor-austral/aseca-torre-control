import { Injectable } from '@nestjs/common';
import { CreateCrossDockingDto } from './dto/create-cross-docking.dto';
import { UpdateCrossDockingDto } from './dto/update-cross-docking.dto';
import {Order} from "@prisma/client";
import {SupplierService} from "../supplier/supplier.service";

@Injectable()
export class CrossDockingService {

  constructor(private supplierService: SupplierService) {
  }

  sendOrderToCrossDocking(orderId : string, buyerId : string, productsId : Array<string>){


  }

  private matchProductsToSuppliers(productsId : Array<string>) : Array<{productId : string, supplierId : Promise<string>}>{
    const suppliersAndProducts = productsId.map((productId) => {
        return {
            productId,
            supplierId: this.supplierService.findAllbyProduct(productId)
        }
    });
    return suppliersAndProducts;
  }
  private generateJson(){}

}
