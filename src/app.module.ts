import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';

@Module({
  imports: [OrderModule],
  controllers: [],
  providers: [OrderService],
})
export class AppModule {}
