const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed para Productos
  const productos = [
    { id: '0', name: 'computadora', price: 10.99, qty: 100 },
    { id: '1', name: 'lenovo2', price: 20.99, qty: 10000 },
    { id: '2', name: 'mac3', price: 5.99, qty: 100000 },
    { id: '3', name: 'mac3pro', price: 15.99, qty: 75 },
    { id: '4', name: 'thinkpad', price: 8.99, qty: 150 },
  ];

  for (const producto of productos) {
    await prisma.product.upsert({
      where: {
        id: producto.id,
      },
      update: {
        price: producto.price,
        qty: producto.qty,
        name: producto.name,
      },
      create: {
        id: producto.id,
        price: producto.price,
        qty: producto.qty,
        name: producto.name,
      },
    });
  }

  // Seed para Suppliers
  const suppliers = [
    {
      id: 'supplierA',
      name: 'supplierA',
      productIds: ['0', '1'], // ids de productos
    },
    {
      id: 'supplierB',
      name: 'supplierB',
      productIds: ['2', '3'], // ids de productos
    },
    {
      id: 'supplierC',
      name: 'supplierC',
      productIds: ['4'], // ids de productos
    },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: {
        id: supplier.id,
      },
      update: {
        name: supplier.name,
        products: {
          connect: supplier.productIds.map((id) => ({ id })),
        },
      },
      create: {
        id: supplier.id,
        name: supplier.name,
        products: {
          connect: supplier.productIds.map((id) => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
