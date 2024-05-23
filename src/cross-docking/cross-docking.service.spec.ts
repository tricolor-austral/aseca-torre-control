import { Test, TestingModule } from '@nestjs/testing';
import { CrossDockingService } from './cross-docking.service';

describe('CrossDockingService', () => {
  let service: CrossDockingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrossDockingService],
    }).compile();

    service = module.get<CrossDockingService>(CrossDockingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
