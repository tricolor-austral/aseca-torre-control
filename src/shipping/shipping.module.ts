import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShipementRepository } from './shipement.repository';
import { ShipmentRepositoryMock } from './shipement.repositoryMock';
import { ShippingController } from './shipping.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ShippingController],
  providers: [
    PrismaService,
    ShippingService,
    ShipementRepository,
    ShipmentRepositoryMock,
  ],
  exports: [ShippingService],
})
export class ShippingModule {}
