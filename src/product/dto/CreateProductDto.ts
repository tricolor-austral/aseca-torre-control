import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
    @IsNotEmpty()
    qty : number;
    @IsNotEmpty()
    price: number;
    @IsArray()
    suppliers:string[];
}
