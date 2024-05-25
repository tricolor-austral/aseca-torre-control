import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  qty: number;
  @IsNotEmpty()
  price: number;
  @IsArray()
  suppliers: string[];
}
