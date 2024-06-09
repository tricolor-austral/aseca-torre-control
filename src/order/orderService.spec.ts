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
  //change status from crossdocking to new
  it('change status from CROSSDOCKING to NEW', async () => {
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

    const updatedOrder = await orderService.changeStatus(
      createdOrder.id,
      'NEW',
    );
    expect(updatedOrder).toBeDefined();
    expect(updatedOrder.status).toEqual('NEW');
  });
  //change order from new to progress
  it('change status from new to PROGRESS', async () => {
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
    const updatedOrder = await orderService.changeStatus(
      createdOrder.id,
      'NEW',
    );
    const updatedOrder2 = await orderService.changeStatus(
      updatedOrder.id,
      'PROGRESS',
    );
    expect(updatedOrder2).toBeDefined();
    expect(updatedOrder2.status).toEqual('PROGRESS');
  });
  //change status from new to delivered should fail
  it('change status from NEW to DELIVERED should fail', async () => {
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

    await expect(
      orderService.changeStatus(createdOrder.id, 'DELIVERED'),
    ).rejects.toThrow('Unavailable to change status');
  });
  //change status to the same status should fail
  it('change status to the same status should fail', async () => {
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

    await expect(
      orderService.changeStatus(createdOrder.id, 'CROSSDOCKING'),
    ).rejects.toThrow('Unavailable to change status');
  });
  it('test 009 should get all orders when none exist', async () => {
    const allOrders = await orderService.getOrders();
    expect(allOrders).toEqual([]);
  });

  it('test 010 should throw an error when trying to change the status of a non-existent order', async () => {
    await expect(
      orderService.changeStatus('nonExistentId', 'NEW'),
    ).rejects.toThrow('Order not found');
  });

  it('test 011 should not create an order if the product does not exist', async () => {
    const orderDto = {
      buyerId: 'buyer_1',
      products: [
        {
          productIds: 'nonExistentProductId',
          qty: 1,
        },
      ],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'Product with ID nonExistentProductId not found',
    );
  });

  it('test 012 should not create an order with a negative quantity', async () => {
    const sup = await createRandomSupplier();
    const prod = await createRandomProduct(sup.name);
    const orderDto = {
      buyerId: 'buyer_1',
      products: [
        {
          productIds: prod.id,
          qty: -1,
        },
      ],
    } as CreateOrderDto;

    await expect(orderService.createOrder(orderDto)).rejects.toThrow(
      'Quantity must be a positive number',
    );
  });

  it('test 013 should not change the status of a non-existent order', async () => {
    await expect(
      orderService.changeStatus('nonExistentId', 'PROGRESS'),
    ).rejects.toThrow('Order not found');
  });
  it('change status from new to cross docking shoud fail', async () => {
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
    await expect(
      orderService.changeStatus(createdOrder.id, 'CROSSDOCKING'),
    ).rejects.toThrow('Unavailable to change status');
  });
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
