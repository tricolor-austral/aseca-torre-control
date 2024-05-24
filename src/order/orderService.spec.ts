import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

describe('orderService.spec.ts', () => {
  let app: INestApplication;
  let orderService: OrderService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService, OrderService, OrderRepository],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    orderService = moduleFixture.get<OrderService>(OrderService);
  });

  it('001_createOrder', () => {
    return orderService
      .createOrder({
        buyerId: 'buyer_1',
        products: [
          {
            productIds: 'f876258b-5755-4b59-92d7-d00c37230781',
            qty: 1,
          },
        ],
      })
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.buyerId).toEqual('60ce267b-d149-493e-b1f8-858a05af8ffc');
        expect(data.products[0].productId).toEqual(
          '9905f2ad-4a67-4e66-9102-151a7312211d',
        );
      });
  });
});
