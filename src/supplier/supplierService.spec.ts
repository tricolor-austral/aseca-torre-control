import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import {SupplierService} from "./supplier.service";
import {PrismaService} from "../prisma/prisma.service";
import {SupplierRepository} from "./supplier.repository";

describe('supplierService.spec.ts', () => {
  let app: INestApplication;
  let supplierService: SupplierService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
          PrismaService,
        SupplierService,
        SupplierRepository
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();


    supplierService = moduleFixture.get<SupplierService>(SupplierService);

  });

  it('001_getSupplierById', () => {
      return supplierService.findSupplier('60ce267b-d149-493e-b1f8-858a05af8ffc').then(data => {
        expect(data).toBeDefined();
        expect(data.id).toEqual('60ce267b-d149-493e-b1f8-858a05af8ffc');
        expect(data.name).toEqual('Supplier 1');
      });

  });

  it('002_getSupplierByWrongId', () => {
        return supplierService.findSupplier('1').then(data => {
            expect(data).toBeNull();
        });
  });

    it('003_getAllSuppliersByProductId', () => {
          return supplierService.findAllbyProduct('9905f2ad-4a67-4e66-9102-151a7312211d').then(data => {
                expect(data).toBeDefined();
                console.log(data)
                expect(data.id).toEqual('e0712050-3603-4884-ae61-fc9677f92fd8');
            });
    });

    it('004_getAllSuppliersByUnexisitngProductIdMustReturnError', () => {});




});
