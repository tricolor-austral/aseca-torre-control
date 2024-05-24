import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { CrossDockingService } from '../cross-docking/cross-docking.service';
import { ProductService } from '../product/product.service';
import { ShippingService } from '../shipping/shipping.service';
import { SupplierService } from '../supplier/supplier.service';
import { SupplierRepository } from '../supplier/supplier.repository';
import { OrderRepositoryMock } from './order.repositoryMock';
import { ProductRepositoryMock } from '../product/product.repositoryMock';
import { CreateOrderDto } from './dto/create-order.dto';

describe('orderService.spec.ts', () => {
  let app: INestApplication;
  let orderService: OrderService;
  const orderDto = {
    buyerId: 'buyer_1',
    products: [
      {
        productIds: 'product_1',
        qty: 1,
      },
    ],
  } as CreateOrderDto;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        PrismaService,
        OrderService,
        OrderRepositoryMock,
        CrossDockingService,
        ProductService,
        ShippingService,
        SupplierService,
        ProductRepositoryMock,
        SupplierRepository,
      ],
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
        expect(data.buyerId).toEqual('buyer_1');
        expect(data.products[0].productId).toEqual(
          'f876258b-5755-4b59-92d7-d00c37230781',
        );
      });
  });
});
