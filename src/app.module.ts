import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';

import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { CrossDockingModule } from './cross-docking/cross-docking.module';
import { ShippingModule } from './shipping/shipping.module';
@Module({
  imports: [
    OrderModule,
    ProductModule,
    SupplierModule,
    CrossDockingModule,
    ShippingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
