import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, PrismaService],
  exports: [OrderRepository],
})
export class OrderModule {}
