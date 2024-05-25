import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ProductService } from './product.service';
import { ProductRepositoryMock } from './product.repositoryMock';
import { ProductRepository } from './product.repository';
import { PrismaService } from '../prisma/prisma.service';
describe('orderService.spec.ts', () => {
  let app: INestApplication;
  let productService: ProductService;
  let productRepositoryMock: ProductRepositoryMock;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        PrismaService,
        ProductService,
        ProductRepository,
        ProductRepositoryMock,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    productService = moduleFixture.get<ProductService>(ProductService);
    productRepositoryMock = moduleFixture.get<ProductRepositoryMock>(
      ProductRepositoryMock,
    );
  });

  it('001_creatingAproduct', async () => {
    const newProd = await productService.createProduct({
      price: 100,
      qty: 1,
      suppliers: [],
    });

    expect(newProd.price).toEqual(100);
    expect(newProd.qty).toEqual(1);
  });

  it('002_creatingAproductWithMoreThan1qty', async () => {
      const newProd = await productService.createProduct({
          price: 100,
          qty: 5,
          suppliers: [],
      });

      expect(newProd.price).toEqual(100);
      expect(newProd.qty).toEqual(5);
  })

    it('003_checkIfThereIsStock', async () => {
        const newProd = await productService.createProduct({
            price: 100,
            qty: 10,
            suppliers: [],
        });

        const hasStock = await productService.checkIfThereIsStock(newProd.id, 5);
        expect(hasStock).toEqual(true);
    })

    it('004_checkIfThereIsStockWithMoreThanAvailable', async () => {
        const newProd = await productService.createProduct({
            price: 100,
            qty: 10,
            suppliers: [],
        });

        const hasStock = await productService.checkIfThereIsStock(newProd.id, 15);
        expect(hasStock).toEqual(false);
    })

  it('005_substractingStock', async () => {
    const newProd = await productService.createProduct({
      price: 100,
      qty: 10,
      suppliers: [],
    });

    const updatedProd = await productService.substractStock(newProd.id, 5);
    expect(updatedProd.qty).toEqual(5);
  });


    it('006_substractingStockWithMoreThanAvailable', async () => {
        const newProd = await productService.createProduct({
            price: 100,
            qty: 10,
            suppliers: [],
        });

        await expect(productService.substractStock(newProd.id, 15)).rejects.toThrow(`Insufficient stock for product ${newProd.id}. Requested: ${15}`);

    });







});
