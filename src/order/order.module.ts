import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductModule } from '../product/product.module';
import { CrossDockingModule } from '../cross-docking/cross-docking.module';
import { OrderRepositoryMock } from './order.repositoryMock';
import { SupplierModule } from '../supplier/supplier.module';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    PrismaService,
    OrderRepositoryMock,
  ],
  exports: [OrderRepository, OrderService],
  imports: [ProductModule, CrossDockingModule, SupplierModule],
})
export class OrderModule {}
