import {Injectable} from '@nestjs/common';

import {SupplierService} from '../supplier/supplier.service';
import {crossDockingOrder} from "./dto/crossDockingOrder";
import {ProductService} from "../product/product.service";
import {CreateOrderDto, CreateSuborderDto, ProductAmountCreate} from "./dto/crossDockingDto";
import axios from "axios";
import {ShippingService} from "../shipping/shipping.service";
import {ShippingDto} from "../shipping/shippingDto";

@Injectable()
export class CrossDockingService {
  constructor(
      private supplierService: SupplierService,
      private productService : ProductService,
      private shippingService: ShippingService,
  ) {}

  async sendOrderToCrossDocking(orderDto: crossDockingOrder) {
      const json = await this.sendJson(orderDto);
      const path = "https://1df7-181-16-82-15.ngrok-free.app/order/create";
      try {
          await axios.post(path, json);


      }
      // Handle errors
      catch (error) {
          console.error('Fetch failed:', error);
    }
  }

  async sendOrderToShipping(shippingDto : ShippingDto) {
      try {
          await this.shippingService.sendOrder(shippingDto);
      }
      catch (error) {
          return error.message();
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








