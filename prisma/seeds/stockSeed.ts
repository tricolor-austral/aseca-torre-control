import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Seed Suppliers
  const suppliers = Array.from({ length: 5 }).map((_, index) => ({
    id: uuidv4(),
    name: `Supplier ${index + 1}`,
  }));

  await prisma.supplier.createMany({
    data: suppliers,
  });

  // Seed Products
  const products = Array.from({ length: 10 }).map(() => ({
    id: uuidv4(),
    price: parseFloat((Math.random() * 100).toFixed(2)), // Generar un precio aleatorio entre 0 y 100 con dos decimales
  }));

  await prisma.product.createMany({
    data: products,
  });

  // Fetch inserted suppliers and products
  const insertedSuppliers = await prisma.supplier.findMany();
  const insertedProducts = await prisma.product.findMany();

  // Seed Stock
  const stocks = insertedProducts.map((product, index) => ({
    id: uuidv4(),
    productId: product.id,
    qty: Math.floor(Math.random() * 100), // Generar una cantidad aleatoria entre 0 y 100
    supplierId: insertedSuppliers[index % insertedSuppliers.length].id, // Relacionar de manera cíclica con los proveedores
  }));

  await prisma.stock.createMany({
    data: stocks,
  });

  console.log('Seeded suppliers, products, and stocks');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
