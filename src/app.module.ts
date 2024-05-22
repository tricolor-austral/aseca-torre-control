import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';

import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [OrderModule, ProductModule, StockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
