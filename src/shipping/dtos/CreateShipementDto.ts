import { IsString } from 'class-validator';

export class CreateShipementDto {
  @IsString()
  orderID: string;
}
