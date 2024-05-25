import {IsArray, IsString} from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsArray()
  products: string[];
}
