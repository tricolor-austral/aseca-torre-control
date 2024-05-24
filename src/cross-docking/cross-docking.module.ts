import { Module } from '@nestjs/common';
import { CrossDockingService } from './cross-docking.service';
import { SupplierModule } from '../supplier/supplier.module';

@Module({
  controllers: [],
  imports: [SupplierModule],
  providers: [CrossDockingService],
  exports: [CrossDockingService],
})
export class CrossDockingModule {}
