import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepositoryMock } from './product.repositoryMock';
import { ProductRepository } from './product.repository';
import { PrismaService } from '../prisma/prisma.service';
describe('orderService.spec.ts', () => {
  let app: INestApplication;
  let productService: ProductService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        ProductService,
          {
              provide: ProductRepository,
              useClass: ProductRepositoryMock,
          },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    productService = moduleFixture.get<ProductService>(ProductService);
  });

    afterAll(async () => {
        await app.close();
    });

  it('001_creatingAproduct', async () => {
    const newProd = await productService.createProduct({
      price: 100,
      qty: 1,
    });

    expect(newProd.price).toEqual(100);
    expect(newProd.qty).toEqual(1);
  });

  it('002_creatingAproductWithMoreThan1qty', async () => {
      const newProd = await productService.createProduct({
          price: 100,
          qty: 5,
      });

      expect(newProd.price).toEqual(100);
      expect(newProd.qty).toEqual(5);
  })

    it('003_checkIfThereIsStock', async () => {
        const newProd = await productService.createProduct({
            price: 100,
            qty: 10,
        });

        const hasStock = await productService.checkIfThereIsStock(newProd.id, 5);
        expect(hasStock).toEqual(true);
    })

    it('004_checkIfThereIsStockWithMoreThanAvailable', async () => {
        const newProd = await productService.createProduct({
            price: 100,
            qty: 10,
        });

        const hasStock = await productService.checkIfThereIsStock(newProd.id, 15);
        expect(hasStock).toEqual(false);
    })

  it('005_substractingStock', async () => {
    const newProd = await productService.createProduct({
      price: 100,
      qty: 10,
    });

    const updatedProd = await productService.substractStock(newProd.id, 5);
    expect(updatedProd.qty).toEqual(5);
  });


    it('006_substractingStockWithMoreThanAvailable', async () => {
        const newProd = await productService.createProduct({
            price: 100,
            qty: 10,
        });

        await expect(productService.substractStock(newProd.id, 15)).rejects.toThrow(`Insufficient stock for product ${newProd.id}. Requested: ${15}`);

    });



    it( '007_ getProductById', async () => {
        const newProd = await productService.createProduct({
            price: 100,
            qty: 10,
        });

        const product = await productService.getProductById(newProd.id);
        expect(product).toEqual(newProd);
        expect(product.id).toEqual(newProd.id);
        expect(product.price).toEqual(newProd.price);
    });








});
