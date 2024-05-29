import { STATUS } from '@prisma/client';

export class OrderOutput {
  id: string;
  buyerId: string;
  products: {
    productIds: string;
    qty: number;
  }[];
  status: STATUS;
}
