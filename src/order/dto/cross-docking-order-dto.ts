export class CrossDockingOrderDto {
  buyerId: string;
  orderId: string;
  products: {
    productIds: string;
    qty: number;
  }[];
}
