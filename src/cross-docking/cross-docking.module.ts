import { Module } from '@nestjs/common';
import { CrossDockingService } from './cross-docking.service';
import { SupplierModule } from '../supplier/supplier.module';
import {ProductModule} from "../product/product.module";
import {ShippingModule} from "../shipping/shipping.module";
import {CrossDockingController} from "./cross-docking.controller";

@Module({
  controllers: [CrossDockingController],
  imports: [SupplierModule,ProductModule, ShippingModule],
  providers: [CrossDockingService],
  exports: [CrossDockingService],
})
export class CrossDockingModule {}
