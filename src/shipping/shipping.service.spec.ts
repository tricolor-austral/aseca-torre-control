import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ShipementRepository } from './shipement.repository';
import { ShipmentRepositoryMock } from './shipement.repositoryMock';
import { ShippingService } from './shipping.service';
describe('productService.spec.ts', () => {
  let shippingService: ShippingService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: ShippingService,
          useClass: ShippingService,
        },
        {
          provide: ShipementRepository,
          useClass: ShipmentRepositoryMock,
        },
      ],
    }).compile();

    shippingService = moduleFixture.get<ShippingService>(ShippingService);
  });

  it('001_creatingAShippement', async () => {
    const newProd = await shippingService.createShipement({
      orderID: '1',
    });
    expect(newProd.orderId).toEqual('1');
    expect(newProd.status).toEqual('NEW');
  });
  it('002_changeStatus', async () => {
    const newProd = await shippingService.createShipement({
      orderID: '1',
    });
    const updatedProd = await shippingService.changeStatus({
      id: newProd.id,
      status: 'PROGRESS',
    });
    expect(updatedProd.status).toEqual('PROGRESS');
  });
  it('003_getAllShippements', async () => {
    await shippingService.createShipement({
      orderID: '1',
    });
    await shippingService.createShipement({
      orderID: '2',
    });
    const allShippements = await shippingService.getAllShippements();
    expect(allShippements.length).toEqual(2);
  });
});
