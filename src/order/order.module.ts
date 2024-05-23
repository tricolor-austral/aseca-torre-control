import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, PrismaService],
  exports: [OrderRepository],
  imports: [ProductModule],
})
export class OrderModule {}
