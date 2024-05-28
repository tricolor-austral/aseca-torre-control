import { Test, TestingModule } from '@nestjs/testing';
import { CrossDockingService } from './cross-docking.service';
import { SupplierService } from '../supplier/supplier.service';
import { SupplierRepository } from '../supplier/supplier.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('CrossDockingService', () => {
  let service: CrossDockingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrossDockingService,
        SupplierService,
        SupplierRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<CrossDockingService>(CrossDockingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
