import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  buyerId: string;
  @IsArray()
  @IsNotEmpty()
  products: {
    productIds: string;
    qty: number;
  }[];
}
