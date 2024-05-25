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
import { ProductRepository } from '../product/product.repository';
import { CreateProductDto } from '../product/dto/CreateProductDto';
import { SupplierRepositoryMock } from '../supplier/supplier.repositoryMock';
import { CreateSupplierDto } from '../supplier/dto/create-supplier.dto';

describe('orderService.spec.ts', () => {
  let app: INestApplication;
  let orderService: OrderService;
  let productService: ProductService;
  let supplierService: SupplierService;
  let supplierRepositoryMock: SupplierRepositoryMock;
  let productRepositoryMock: ProductRepositoryMock;
  let orderRepositoryMock: OrderRepositoryMock;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        PrismaService,
        {
          provide: OrderService,
          useClass: OrderService,
        },
        {
          provide: OrderRepository,
          useClass: OrderRepositoryMock,
        },
        {
          provide: ProductRepository,
          useClass: ProductRepositoryMock,
        },
        {
          provide: SupplierRepository,
          useClass: SupplierRepositoryMock,
        },
        CrossDockingService,
        ProductService,
        ShippingService,
        SupplierService,
        SupplierRepository,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    orderService = moduleFixture.get<OrderService>(OrderService);
    productService = moduleFixture.get<ProductService>(ProductService);
    supplierService = moduleFixture.get<SupplierService>(SupplierService);
    supplierRepositoryMock = moduleFixture.get<SupplierRepository>(
      SupplierRepository,
    ) as SupplierRepositoryMock;
    productRepositoryMock = moduleFixture.get<ProductRepository>(
      ProductRepository,
    ) as ProductRepositoryMock;
    orderRepositoryMock = moduleFixture.get<OrderRepository>(
      OrderRepository,
    ) as OrderRepositoryMock;
  });

  afterEach(async () => {
    await app.close();
    supplierRepositoryMock.clear();
    productRepositoryMock.clear();
    orderRepositoryMock.clear();
  });

  //Primer paso -> Chequear si hay stock
  it('create_order_from_not_enough_stock_product_1', async () => {
    const supplierDto = {
      id: 'supplier_10',
      name: 'Supplier 1',
    } as CreateSupplierDto;
    const orderDto = {
      buyerId: 'buyer_10',
      products: [
        {
          productIds: 'product_10',
          qty: 30,
        },
      ],
    } as CreateOrderDto;
    const productDto = {
      productId: 'product_10',
      qty: 29,
      price: 100,
      suppliers: ['supplier_10'],
    } as CreateProductDto;
    await supplierService.createSupplier(supplierDto);
    await productService.createProduct(productDto);

    try {
      await orderService.createOrder(orderDto);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('No hay stock suficiente');
    }
  });

  it('create_order_from_existing_product_', async () => {
    const supplierDto = {
      id: 'supplier_2',
      name: 'Supplier 1',
    } as CreateSupplierDto;
    const orderDto = {
      buyerId: 'buyer_2',
      products: [
        {
          productIds: 'product_1',
          qty: 1,
        },
      ],
    } as CreateOrderDto;
    const productDto = {
      productId: 'product_2',
      qty: 50,
      price: 100,
      suppliers: ['supplier_2'],
    } as CreateProductDto;
    await supplierService.createSupplier(supplierDto);
    await productService.createProduct(productDto);
    const createdOrder = await orderService.createOrder(orderDto);

    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerId).toEqual(orderDto.buyerId);
    expect(createdOrder.products[0].productIds).toEqual(
      orderDto.products[0].productIds,
    );
  });
});
