import { Test, TestingModule } from '@nestjs/testing';
import { CrossDockingService } from './cross-docking.service';
import { SupplierService } from '../supplier/supplier.service';
import { SupplierRepository } from '../supplier/supplier.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('CrossDockingService', () => {
  let crossDockingService: CrossDockingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrossDockingService,
        SupplierService,
        SupplierRepository,
        PrismaService,
      ],
    }).compile();

    crossDockingService = module.get<CrossDockingService>(CrossDockingService);
  });

  it('should be defined', () => {
    expect(crossDockingService).toBeDefined();
  });
});
