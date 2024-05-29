
import {Product} from "@prisma/client";

export class ProductAmountCreate {
    public productId: string;
    public amount: number;
    constructor(id : string, qty: number) {
        this.productId = id;
        this.amount = qty;
    }
}


export class CreateSuborderDto {
    supplierId: string;
    productAmount: ProductAmountCreate[];

    constructor(supplierId: string, pas: ProductAmountCreate[]) {
        this.supplierId = supplierId;
        this.productAmount = pas;
    }
}


export class CreateOrderDto {
    clientId: string;
    subOrders: CreateSuborderDto[];

    constructor(clientId: string, subOrders: CreateSuborderDto[]) {
        this.clientId = clientId;
        this.subOrders = subOrders;
    }
}