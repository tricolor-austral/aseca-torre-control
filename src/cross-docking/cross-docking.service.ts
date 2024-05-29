import { Injectable } from '@nestjs/common';

import { SupplierService } from '../supplier/supplier.service';
import { crossDockingOrder } from './dto/crossDockingOrder';
import { ProductService } from '../product/product.service';
import {
  CreateOrderDto,
  CreateSuborderDto,
  ProductAmountCreate,
} from './dto/crossDockingDto';
import axios from 'axios';
import { ShippingService } from '../shipping/shipping.service';
import { CreateShipementDto } from '../shipping/dtos/CreateShipementDto';
import { OrderService } from '../order/order.service';

@Injectable()
export class CrossDockingService {
  constructor(
    private supplierService: SupplierService,
    private orderService: OrderService,
    private shippingService: ShippingService,
  ) {}

  async sendOrderToCrossDocking(orderDto: crossDockingOrder) {
    const json = await this.sendJson(orderDto);
    const path = 'https://fbd4-181-16-82-15.ngrok-free.app' + '/order/create';
    try {
      await axios.post(path, json);
    } catch (error) {
      // Handle errors
      console.error('Fetch failed:', error);
    }
  }

  async sendOrderToShipping(shippingDto: CreateShipementDto) {
    await this.orderService.changeStatus(shippingDto.orderID, 'NEW');
    try {
      await this.shippingService.sendOrder(shippingDto);
    } catch (error) {
      return error.message();
    }
  }

  private async sendJson(orderDto: crossDockingOrder) {
    //manejar error de supplier not found
    const suppliers = new Array(orderDto.products.length);
    for (let i = 0; i < orderDto.products.length; i++) {
      const productId = orderDto.products[i].productIds;
      suppliers[i] = await this.supplierService.findAllbyProduct(productId);
    }
    const subOrders = await this.generateSubOrders(
      suppliers,
      orderDto.products,
    );
    return new CreateOrderDto(orderDto.buyerId, orderDto.orderId, subOrders);
  }

  private async generateSubOrders(suppliers, products) {
    const subOrders = new Array(products.length);
    for (let i = 0; i < products.length; i++) {
      const productAmountCreate = new ProductAmountCreate(
        products[i].productIds,
        products[i].qty,
      );
      subOrders[i] = new CreateSuborderDto(suppliers[i], [productAmountCreate]);
    }
    return subOrders;
  }
}
