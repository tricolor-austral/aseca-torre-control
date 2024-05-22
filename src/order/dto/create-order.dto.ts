import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  buyerId: string;
  @IsArray()
  @IsNotEmpty()
  productIds: string[];
}
