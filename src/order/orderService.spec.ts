import { Test, TestingModule } from '@nestjs/testing';
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
import { SupplierRepositoryMock } from '../supplier/supplier.repositoryMock';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

describe('OrderService', () => {
  let orderService: OrderService;
  let productService: ProductService;
  let supplierService: SupplierService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    orderService = moduleFixture.get<OrderService>(OrderService);
    productService = moduleFixture.get<ProductService>(ProductService);
    supplierService = moduleFixture.get<SupplierService>(SupplierService);
  });
  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });
  //Primer paso -> No puedo crear la orden no hay stock
  it('test 001 should not create an order if there is not enough stock', async () => {
    const sup = await createRandomSupplier();
    const prod = await createRandomProduct([sup.id]);
    const orderDto = {
      buyerId: 'buyer_10',
      products: [
        {
          productIds: prod.id,
          qty: 30,
        },
      ],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'No hay stock suficiente',
    );
  });
  //CREO UNA ORDEN VACIA
  it('test 002 should create an empty order', async () => {
    const orderDto = {
      buyerId: 'buyer_1',
      products: [],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'No hay productos en la orden',
    );
  });
  //CREO UNA ORDEN SIN COMPRADOR
  it('test 003 should create an order without a buyer', async () => {
    const sup = await createRandomSupplier();
    const prod = await createRandomProduct([sup.id]);
    const orderDto = {
      buyerId: '',
      products: [
        {
          productIds: prod.id,
          qty: 1,
        },
      ],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'No hay un comprador',
    );
  });
  //CREO UNA ORDEN CON UN BUYER_ID INEXISTENTE
  it('test 004 should create an order with a non-existent buyer', async () => {
    const sup = await createRandomSupplier();
    const prod = await createRandomProduct([sup.id]);
    const orderDto = {
      buyerId: 'buyer_2',
      products: [
        {
          productIds: prod.id,
          qty: 1,
        },
      ],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'No hay stock suficiente',
    );
  });

  it('should create an order of one item', async () => {
    const sup = await createRandomSupplier();
    const prod = await createRandomProduct([sup.id]);
    const orderDto = {
      products: [
        {
          productIds: prod.id,
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

  async function createRandomProduct(supplierIds: string[]) {
    const val: string = randomStringGenerator();
    return await productService.createProduct({
      productId: val,
      qty: 10,
      price: 100,
      suppliers: supplierIds,
    });
  }
  async function createRandomSupplier() {
    const val: string = randomStringGenerator();
    return await supplierService.createSupplier({
      id: val,
      name: 'Supplier nro: ' + val,
    });
  }
});
