import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStockDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNumber()
  @IsNotEmpty()
  qty: number;
}
