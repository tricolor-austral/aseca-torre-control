import {Injectable} from '@nestjs/common';

import {SupplierService} from '../supplier/supplier.service';
import {crossDockingOrder} from "./dto/crossDockingOrder";
import {ProductService} from "../product/product.service";
import {CreateOrderDto, CreateSuborderDto, ProductAmountCreate} from "./dto/crossDockingDto";

@Injectable()
export class CrossDockingService {
  constructor(private supplierService: SupplierService,private productService : ProductService) {}

  async sendOrderToCrossDocking(orderDto: crossDockingOrder) {
      const json = await this.sendJson(orderDto);
      const path = "https://5437-2800-af0-1409-3117-c11d-3c1f-dca-2a9e.ngrok-free.app/order/create";
      console.log(JSON.stringify(json))
      await fetch(path, {method: 'POST', body: JSON.stringify(json), headers: {'Content-Type': 'application/json'}})
  }

  private async sendJson(orderDto: crossDockingOrder) {
      //manejar error de supplier not found
      const suppliers =   orderDto.productsId.map( async (productsId) => {
          return await this.supplierService.findAllbyProduct(productsId)
      });
      const subOrders = this.generateSubOrders(suppliers, orderDto.productsId);
      return new CreateOrderDto(orderDto.buyerId, subOrders);


  }


  private generateSubOrders(suppliers, productsId) {
      const products =  productsId.map(async (productId) => {
          return await this.productService.getProductById(productId)
      });

      const subOrders = new Array(products.length);
            for (let i = 0; i < products.length; i++) {
                const productAmountCreate = new ProductAmountCreate(products[i]);
                subOrders.push(new CreateSuborderDto(suppliers[i], [productAmountCreate]));
            }
        return subOrders;
  }




  }








