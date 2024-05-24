import { PartialType } from '@nestjs/mapped-types';
import { CreateCrossDockingDto } from './create-cross-docking.dto';

export class UpdateCrossDockingDto extends PartialType(CreateCrossDockingDto) {}
