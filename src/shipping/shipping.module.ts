import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService, ShippingService],
  exports: [ShippingService],
})
export class ShippingModule {}
