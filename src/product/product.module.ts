import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductRepository } from './product.repository';
import { ProductRepositoryMock } from './product.repositoryMock';
import { SupplierModule } from '../supplier/supplier.module';

@Module({
  controllers: [ProductController],
  imports: [SupplierModule],
  providers: [
    ProductService,
    ProductRepository,
    PrismaService,
    ProductRepositoryMock,
  ],
  exports: [ProductService],
})
export class ProductModule {}
