import { Module } from '@nestjs/common';
import { StockRepository } from './stock.repository';
import { PrismaService } from '../prisma/prisma.service';
import { StockServices } from './stock.services';

@Module({
  providers: [StockRepository, StockServices, PrismaService],
  exports: [StockServices],
})
export class StockModule {}
