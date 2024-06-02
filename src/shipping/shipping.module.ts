import { forwardRef, Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { PrismaService } from '../prisma/prisma.service';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [],
  providers: [PrismaService, ShippingService],
  exports: [ShippingService],
  imports: [forwardRef(() => OrderModule)],
})
export class ShippingModule {}
