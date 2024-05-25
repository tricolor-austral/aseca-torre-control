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

describe('OrderService', () => {
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
        OrderService,
        OrderRepository,
        OrderRepositoryMock,
        ProductRepository,
        ProductRepositoryMock,
        SupplierRepository,
        SupplierRepositoryMock,
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
    supplierRepositoryMock = moduleFixture.get<SupplierRepositoryMock>(
      SupplierRepositoryMock,
    );
    productRepositoryMock = moduleFixture.get<ProductRepositoryMock>(
      ProductRepositoryMock,
    );
    orderRepositoryMock =
      moduleFixture.get<OrderRepositoryMock>(OrderRepositoryMock);

    // Limpia los datos de los mocks
    await supplierRepositoryMock.clear();
    await productRepositoryMock.clear();
    await orderRepositoryMock.clear();
  });
  afterEach(async () => {
    await app.close();
  });
  it('should not create an order if there is not enough stock', async () => {
    const orderDto = {
      buyerId: 'buyer_10',
      products: [
        {
          productIds: 'product_100',
          qty: 30,
        },
      ],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'No hay stock suficiente',
    );
  });

  it('should create an order from existing product', async () => {
    const orderDto = {
      buyerId: 'buyer_2',
      products: [
        {
          productIds: 'product_100',
          qty: 1,
        },
      ],
    } as CreateOrderDto;

    const createdOrder = await orderService.createOrder(orderDto);

    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerId).toEqual(orderDto.buyerId);
    expect(createdOrder.products[0].productIds).toEqual(
      orderDto.products[0].productIds,
    );
  });

  async function instanceSuppliersAndProducts(
    supplierService: SupplierService,
    productService: ProductService,
  ) {
    const supplierDto = {
      id: 'supplier_38',
      name: 'Supplier 1',
    } as CreateSupplierDto;
    const productDto = {
      productId: 'product_100',
      qty: 20,
      price: 100,
      suppliers: ['supplier_38'],
    } as CreateProductDto;

    await supplierService.createSupplier(supplierDto);
    await productService.createProduct(productDto);
  }
});
