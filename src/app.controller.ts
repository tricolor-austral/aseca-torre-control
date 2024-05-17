import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  order()  {
//      this.appService.createOrder()
}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
