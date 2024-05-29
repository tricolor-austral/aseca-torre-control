import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, STATUS, OrderProduct } from '@prisma/client';
import { OrderOutput } from './dto/OrderOutput';

export class OrderRepositoryMock extends OrderRepository {
  private orders: Order[] = [];
  private orderProducts: OrderProduct[] = [];
  private nextOrderId = '1';
  private nextOrderProductId = '1';

  async create(newOrder: CreateOrderDto): Promise<OrderOutput> {
    // Create new order
    const newOrderWithId: Order = {
      id: this.nextOrderId,
      buyerId: newOrder.buyerId,
      status: STATUS.CROSSDOCKING,
    };

    this.orders.push(newOrderWithId);

    // Create related OrderProduct entries
    newOrder.products.forEach((product) => {
      const newOrderProduct: OrderProduct = {
        id: this.nextOrderProductId,
        orderId: this.nextOrderId,
        productId: product.productIds,
        qtyBought: product.qty,
      };
      this.orderProducts.push(newOrderProduct);
      this.nextOrderProductId = (
        BigInt(this.nextOrderProductId) + BigInt(1)
      ).toString();
    });

    this.nextOrderId = (BigInt(this.nextOrderId) + BigInt(1)).toString();

    const orderOutput: OrderOutput = {
      id: newOrderWithId.id,
      buyerId: newOrderWithId.buyerId,
      products: newOrder.products.map((product) => ({
        productIds: product.productIds,
        qty: product.qty,
      })),
      status: newOrderWithId.status,
    };

    return Promise.resolve(orderOutput);
  }

  findAll(): Promise<Awaited<Order[]>> {
    return Promise.resolve(this.orders);
  }
  async changeStatus(id: string, status: STATUS) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    order.status = status;
    return order;
  }
}
