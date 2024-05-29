import { IsString } from 'class-validator';


export class ShippingDto{
    @IsString()
    orderID: string;
    @IsString()
    buyerId: string;
}