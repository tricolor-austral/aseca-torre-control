import { IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
}
