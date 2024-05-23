import { Module } from '@nestjs/common';
import { CrossDockingService } from './cross-docking.service';
import { CrossDockingController } from './cross-docking.controller';

@Module({
  controllers: [CrossDockingController],
  providers: [CrossDockingService],
})
export class CrossDockingModule {}
