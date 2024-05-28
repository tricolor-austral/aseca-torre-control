import {Injectable} from '@nestjs/common';

import {SupplierService} from '../supplier/supplier.service';
import {crossDockingOrder} from "./dto/crossDockingOrder";
import {ProductService} from "../product/product.service";
import {CreateOrderDto, CreateSuborderDto, ProductAmountCreate} from "./dto/crossDockingDto";
import axios from "axios";

@Injectable()
export class CrossDockingService {
  constructor(private supplierService: SupplierService,private productService : ProductService) {}

  async sendOrderToCrossDocking(orderDto: crossDockingOrder) {
      const json = await this.sendJson(orderDto);
      const path = "https://03d7-2800-af0-1409-3117-c11d-3c1f-dca-2a9e.ngrok-free.app/order/create";
      try {
          await axios.post(path, json);


      }
      // Handle errors
      catch (error) {
          console.error('Fetch failed:', error);
    }
  }

  private async sendJson(orderDto: crossDockingOrder) {
      //manejar error de supplier not found
      const suppliers =  new Array(orderDto.productsId.length)
      for(let i = 0; i < orderDto.productsId.length; i++) {
            suppliers[i] = await this.supplierService.findAllbyProduct(orderDto.productsId[i]);
      }
      const subOrders = await this.generateSubOrders(suppliers, orderDto.productsId);
      return new CreateOrderDto(orderDto.buyerId, subOrders);


  }


  private async generateSubOrders(suppliers, productsId) {
      const products = new Array(productsId.length);
        for (let i = 0; i < productsId.length; i++) {
            products[i] = await this.productService.getProductById(productsId[i]);
        }

      const subOrders = new Array(products.length);
      for (let i = 0; i < products.length; i++) {
          const productAmountCreate = await new ProductAmountCreate(products[i]);
          subOrders[i] = (new CreateSuborderDto(suppliers[i], [productAmountCreate]));
      }
      return subOrders;
  }




  }








