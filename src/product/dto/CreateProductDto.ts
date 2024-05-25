import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  qty: number;
  @IsNotEmpty()
  price: number;
}
