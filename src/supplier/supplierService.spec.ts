import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierRepositoryMock } from './supplier.repositoryMock';
import { SupplierRepository } from './supplier.repository';

describe('supplierService.spec.ts', () => {
  let app: INestApplication;
  let supplierService: SupplierService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
          PrismaService,
          SupplierService,
          {
              provide: SupplierRepository,
              useClass: SupplierRepositoryMock,
          },

      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    supplierService = moduleFixture.get<SupplierService>(SupplierService);
  });



  it('001_createSupplier', async () => {
    const newSuplier = await supplierService.createSupplier({
      name: 'Supplier 1',
      products: ['1', '2', '3'],
    });

    expect(newSuplier.name).toEqual('Supplier 1');
  });

  it('002_getSupplierById', async () => {
    const newSuplier = await supplierService.createSupplier({
      name: 'Supplier 1',
      products: ['1', '2', '3'],
    });

    const supplier = await supplierService.findSupplier(newSuplier.id);
    expect(supplier.name).toEqual(newSuplier.name);
  });

  it('003_getSuppliersByProduct', async () => {
    const newSuplier = await supplierService.createSupplier({
      name: 'Supplier 1',
      products: ['1', '2', '3'],
    });

    const newSuplier2 = await supplierService.createSupplier({
      name: 'Supplier 2',
      products: ['7', '8', '9'],
    });

    const supplier = await supplierService.findAllbyProduct('2');
    const supplier2 = await supplierService.findAllbyProduct('8');
    expect(supplier).toEqual(newSuplier.id);
    expect(supplier2).toEqual(newSuplier2.id);
  });

  it('004_getSuppliersByProductWithNoSupplierMustBeEMpty', async () => {
    const newSuplier = await supplierService.createSupplier({
      name: 'Supplier 1',
      products: ['1', '2', '3'],
    });

    const supplier = await supplierService.findAllbyProduct('4');
    expect(supplier).toEqual(undefined);
    // hay q ver bien como hacer la exception por el undefined y comom hacer si el id del prod no existe
  });
});
