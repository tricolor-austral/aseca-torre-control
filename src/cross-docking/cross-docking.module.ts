import { Module } from '@nestjs/common';
import { CrossDockingService } from './cross-docking.service';

@Module({
  controllers: [],
  providers: [CrossDockingService],
})
export class CrossDockingModule {}
