import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrossDockingService } from './cross-docking.service';
import { CreateCrossDockingDto } from './dto/create-cross-docking.dto';
import { UpdateCrossDockingDto } from './dto/update-cross-docking.dto';

@Controller('cross-docking')
export class CrossDockingController {
  constructor(private readonly crossDockingService: CrossDockingService) {}




}
