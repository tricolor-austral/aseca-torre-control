import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepositoryMock } from './product.repositoryMock';
import { ProductRepository } from './product.repository';
import { PrismaService } from '../prisma/prisma.service';
describe('productService.spec.ts', () => {
  let productService: ProductService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: ProductService,
          useClass: ProductService,
        },
        {
          provide: ProductRepository,
          useClass: ProductRepositoryMock,
        },
      ],
    }).compile();

    productService = moduleFixture.get<ProductService>(ProductService);
  });
  it('001_creatingAproduct', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 1,
    });

    expect(newProd.price).toEqual(100);
    expect(newProd.qty).toEqual(1);
  });

  it('002_creatingAproductWithMoreThan1qty', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 5,
    });

    expect(newProd.price).toEqual(100);
    expect(newProd.qty).toEqual(5);
  });

  it('003_checkIfThereIsStock', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });

    const hasStock = await productService.checkIfThereIsStock(newProd.id, 5);
    expect(hasStock).toEqual(true);
  });

  it('004_checkIfThereIsStockWithMoreThanAvailable', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });

    const hasStock = await productService.checkIfThereIsStock(newProd.id, 15);
    expect(hasStock).toEqual(false);
  });

  it('005_substractingStock', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });

    const updatedProd = await productService.substractStock(newProd.id, 5);
    expect(updatedProd.qty).toEqual(5);
  });

  it('006_substractingStockWithMoreThanAvailable', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });

    await expect(productService.substractStock(newProd.id, 15)).rejects.toThrow(
      `Insufficient stock for product ${newProd.id}. Requested: ${15}`,
    );
  });

  it('007_ getProductById', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });

    const product = await productService.getProductById(newProd.id);
    expect(product).toEqual(newProd);
    expect(product.id).toEqual(newProd.id);
    expect(product.price).toEqual(newProd.price);
  });

  it('008_ getProductByIdNotFound', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });
    await expect(productService.getProductById('fakeId')).rejects.toThrow(
      NotFoundException,
    );
  });
  it('009_createProductWithSupplierEmpty', async () => {
    await expect(
      productService.createProduct({
        name: 'mac',
        supplierName: '',
        price: 100,
        qty: 10,
      }),
    ).rejects.toThrow('Supplier not found');
  });
  it('010_createProductWithSupplierNotFound', async () => {
    await expect(
      productService.createProduct({
        name: 'mac',
        supplierName: 'fakeSupplier',
        price: 100,
        qty: 10,
      }),
    ).rejects.toThrow('Supplier not found');
  });

  it('011_addStockToNonExistentProduct', async () => {
    await expect(productService.addStock('nonExistentId', 5)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('012 add stock to product successfully', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });
    const updatedProd = await productService.addStock(newProd.id, 5);
    expect(updatedProd.qty).toEqual(15);
  });

  it('013_getAllProductsWhenNoneExist', async () => {
    const allProducts = await productService.getAllProducts();
    expect(allProducts).toEqual([]);
  });

  it('014_createProductWithNegativePrice', async () => {
    await expect(
      productService.createProduct({
        name: 'mac',
        supplierName: 'apple',
        price: -100,
        qty: 10,
      }),
    ).rejects.toThrow('Price cannot be negative');
  });

  it('015_addStockWithNegativeQuantity', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });

    await expect(productService.addStock(newProd.id, -5)).rejects.toThrow(
      'Quantity must be a positive number',
    );
  });

  it('016_substractStockWithNegativeQuantity', async () => {
    const newProd = await productService.createProduct({
      name: 'mac',
      supplierName: 'apple',
      price: 100,
      qty: 10,
    });

    await expect(productService.substractStock(newProd.id, -5)).rejects.toThrow(
      'Quantity must be a positive number',
    );
  });
});
