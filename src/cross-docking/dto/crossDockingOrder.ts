
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
export class crossDockingOrder {
    @IsString()
    orderId: string;
    @IsString()
    buyerId: string;
    @IsArray()
    products:{
        productIds: string;
        qty: number;
    }[];
}
