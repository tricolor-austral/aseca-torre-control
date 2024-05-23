import { Test, TestingModule } from '@nestjs/testing';
import { CrossDockingController } from './cross-docking.controller';
import { CrossDockingService } from './cross-docking.service';

describe('CrossDockingController', () => {
  let controller: CrossDockingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrossDockingController],
      providers: [CrossDockingService],
    }).compile();

    controller = module.get<CrossDockingController>(CrossDockingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
