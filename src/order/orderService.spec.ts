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

describe('OrderService', () => {
  let orderService: OrderService;
  let productService: ProductService;
  let supplierService: SupplierService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
        ShippingService,
        SupplierService,
        ProductService,
        ShippingService,
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
    const prod = await createRandomProduct(sup.name);
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
    const prod = await createRandomProduct(sup.name);
    const orderDto = {
      buyerId: '',
      products: [
        {
          productIds: prod.id,
          qty: 1,
          name: prod.name,
        },
      ],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'No hay un comprador',
    );
  });

  it('test 004 should create an order of one item', async () => {
    const sup = await createRandomSupplier();
    const prod = await createRandomProduct(sup.name);
    const orderDto = {
      buyerId: 'buyer_1',
      products: [
        {
          productIds: prod.id,
          qty: 1,
          name: prod.name,
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
  //Creo una orden de 2 items
  it('test 005 should create an order of two items', async () => {
    const sup = await createRandomSupplier();
    const prod1 = await createRandomProduct(sup.name);
    const prod2 = await createRandomProduct(sup.name);

    const orderDto = {
      buyerId: 'buyer_1',
      products: [
        {
          productIds: prod1.id,
          qty: 1,
          name: prod1.name,
        },
        {
          productIds: prod2.id,
          qty: 1,
          name: prod2.name,
        },
      ],
    } as CreateOrderDto;

    const createdOrder = await orderService.createOrder(orderDto);

    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerId).toEqual(orderDto.buyerId);
    expect(createdOrder.products[0].productIds).toEqual(
      orderDto.products[0].productIds,
    );
    expect(createdOrder.products[1].productIds).toEqual(
      orderDto.products[1].productIds,
    );
  });
  //Creo orden de 2 productos de 2 suppliers distintos
  it('test 006 should create an order of two items from two different suppliers', async () => {
    const sup1 = await createRandomSupplier();
    const sup2 = await createRandomSupplier();
    const prod1 = await createRandomProduct(sup1.name);
    const prod2 = await createRandomProduct(sup2.name);
    const orderDto = {
      buyerId: 'buyer_1',
      products: [
        {
          productIds: prod1.id,
          qty: 1,
        },
        {
          productIds: prod2.id,
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
    expect(createdOrder.products[1].productIds).toEqual(
      orderDto.products[1].productIds,
    );
  });
  //create order with products from the same supplier
  it('test 007 should create an order with products from the same supplier', async () => {
    const sup = await createRandomSupplier();
    const prod1 = await createRandomProduct(sup.name);
    const prod2 = await createRandomProduct(sup.name);
    const orderDto = {
      buyerId: 'buyer_1',
      products: [
        {
          productIds: prod1.id,
          qty: 1,
        },
        {
          productIds: prod2.id,
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
    expect(createdOrder.products[1].productIds).toEqual(
      orderDto.products[1].productIds,
    );
  });
  //Test de crear muna orden con muchos productos y distintps suppliers
  it('test 008 should create an order with many products from different suppliers', async () => {
    const sup2 = await createRandomSupplier();
    const sup1 = await createRandomSupplier();
    const prod1 = await createRandomProduct(sup1.name);
    const prod2 = await createRandomProduct(sup2.name);
    const prod3 = await createRandomProduct(sup1.name);
    const prod4 = await createRandomProduct(sup2.name);

    const orderDto = {
      buyerId: 'buyer_1',
      products: [
        {
          productIds: prod1.id,
          qty: 1,
        },
        {
          productIds: prod2.id,
          qty: 1,
        },
        {
          productIds: prod3.id,
          qty: 1,
        },
        {
          productIds: prod4.id,
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
    expect(createdOrder.products[1].productIds).toEqual(
      orderDto.products[1].productIds,
    );
    expect(createdOrder.products[2].productIds).toEqual(
      orderDto.products[2].productIds,
    );
    expect(createdOrder.products[3].productIds).toEqual(
      orderDto.products[3].productIds,
    );
  });
  it('create an  order with status CROSSDOCKING', async () => {
    const sup = await createRandomSupplier();
    const prod = await createRandomProduct(sup.name);
    const orderDto = {
      buyerId: 'buyer_1',
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
    expect(createdOrder.status).toEqual('CROSSDOCKING');
  });
  // it('change status from order to PROGRESS', async () => {
  //   const sup = await createRandomSupplier();
  //   const prod = await createRandomProduct(sup.name);
  //   const orderDto = {
  //     buyerId: 'buyer_1',
  //     products: [
  //       {
  //         productIds: prod.id,
  //         qty: 1,
  //       },
  //     ],
  //   } as CreateOrderDto;
  //
  //   const createdOrder = await orderService.createOrder(orderDto);
  //
  //   const updatedOrder = await orderService.changeStatus(
  //     createdOrder.id,
  //     'PROGRESS',
  //   );
  //   expect(updatedOrder).toBeDefined();
  //   expect(updatedOrder.status).toEqual('PROGRESS');
  // });
  async function createRandomProduct(supplierName: string) {
    return await productService.createProduct({
      qty: 10,
      name: 'computadora',
      price: 100,
      supplierName: supplierName,
    });
  }
  async function createRandomSupplier() {
    return await supplierService.createSupplier({
      name: 'apple',
      products: [],
    });
  }
});
