import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return await this.orderService.getOrders();
  }

  @Post()
  async createOrder(@Body() data: CreateOrderDto) {
    try {
      return await this.orderService.createOrder(data);
    }
    catch (error) {
      console.log(error.message)
      return error.message();
    }
  }
}
