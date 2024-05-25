 import { Test, TestingModule } from '@nestjs/testing';
 import { INestApplication } from '@nestjs/common';
 import { AppModule } from '../app.module';
 import { SupplierService } from './supplier.service';
 import { PrismaService } from '../prisma/prisma.service';
 import {SupplierRepositoryMock} from "./supplier.repositoryMock";

 describe('supplierService.spec.ts', () => {
     let app: INestApplication;
     let supplierService: SupplierService;
     let supplierRepositoryMock: SupplierRepositoryMock;

     beforeEach(async () => {
         const moduleFixture: TestingModule = await Test.createTestingModule({
             imports: [AppModule],
             providers: [PrismaService, SupplierService, SupplierRepositoryMock],
         }).compile();

         app = moduleFixture.createNestApplication();
         await app.init();

         supplierService = moduleFixture.get<SupplierService>(SupplierService);
         supplierRepositoryMock = moduleFixture.get<SupplierRepositoryMock>(SupplierRepositoryMock);
     });

     it('001_createSupplier',async () => {
         const newSuplier = await supplierService.createSupplier({
             name: 'Supplier 1',
             products: ['1', '2', '3']
         })

         expect(newSuplier.name).toEqual('Supplier 1');

     });


     it('002_getSupplierById', async() => {
         const newSuplier = await supplierService.createSupplier({
             name: 'Supplier 1',
             products: ['1', '2', '3']
         })

         const supplier = await supplierService.findSupplier(newSuplier.id);
         expect(supplier.name).toEqual(newSuplier.name);
     });

     it('003_getSuppliersByProduct', async () => {
         const newSuplier = await supplierService.createSupplier({
             name: 'Supplier 1',
             products: ['1', '2', '3']
         })

         const newSuplier2 = await supplierService.createSupplier({
             name: 'Supplier 2',
             products: ['7', '8', '9']
         })

         const supplier = await supplierService.findAllbyProduct('2');
         const supplier2 = await supplierService.findAllbyProduct('8');
         expect(supplier).toEqual(newSuplier.id);
         expect(supplier2).toEqual(newSuplier2.id);

     });


     it('004_getSuppliersByProductWithNoSupplierMustBeEMpty', async () => {
         const newSuplier = await supplierService.createSupplier({
             name: 'Supplier 1',
             products: ['1', '2', '3']
         })

         const supplier = await supplierService.findAllbyProduct('4');
         expect(supplier).toEqual(null);

     });

 });

