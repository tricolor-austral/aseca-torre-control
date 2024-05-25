import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierRepository } from './supplier.repository';
import { PrismaService } from '../prisma/prisma.service';
import {SupplierRepositoryMock} from "./supplier.repositoryMock";

@Module({
  providers: [PrismaService, SupplierService, SupplierRepository, SupplierRepositoryMock],
  exports: [SupplierService],
})
export class SupplierModule {}
