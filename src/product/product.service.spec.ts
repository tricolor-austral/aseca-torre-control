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
      productId: '1',
      price: 100,
      qty: 1,
      suppliers: [],
    });

    expect(newProd).toEqual({
      id: '1',
      price: 100,
      qty: 1,
      suppliers: [],
    });
  });
});
