import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import {SupplierRepository} from "./supplier.repository";
import {PrismaService} from "../prisma/prisma.service";

@Module({
  providers: [PrismaService,SupplierService,SupplierRepository],
  exports: [SupplierService],
})
export class SupplierModule {}
