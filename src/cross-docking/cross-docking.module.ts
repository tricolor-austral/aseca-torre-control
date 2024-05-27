import { Module } from '@nestjs/common';
import { CrossDockingService } from './cross-docking.service';
import { SupplierModule } from '../supplier/supplier.module';
import {ProductModule} from "../product/product.module";

@Module({
  controllers: [],
  imports: [SupplierModule,ProductModule],
  providers: [CrossDockingService],
  exports: [CrossDockingService],
})
export class CrossDockingModule {}
