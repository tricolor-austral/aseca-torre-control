const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed para Productos
  const productos = [
    { id: 'computadora', price: 10.99, qty: 100 },
    { id: 'lenvo2', price: 20.99, qty: 10000 },
    { id: 'mac3', price: 5.99, qty: 100000 },
    { id: 'mac3pro', price: 15.99, qty: 75 },
    { id: 'thinkpad', price: 8.99, qty: 150 },
  ];

  for (const producto of productos) {
    await prisma.product.upsert({
      where: {
        id: producto.id,
      },
      update: {},
      create: {
        id: producto.id,
        price: producto.price,
        qty: producto.qty,
      },
    });
  }

  //seed para suppliers
  const suppliers = [
    {
      id: 'supplierA',
      name: 'supplierA',
      products: {
        connect: [{ id: 'computadora' }, { id: 'lenvo2' }],
      },
    },
    {
      id: 'supplierB',
      name: 'supplierB',
      products: {
        connect: [{ id: 'mac3' }, { id: 'mac3pro' }],
      },
    },
    {
      id: 'supplierC',
      name: 'supplierC',
      products: {
        connect: [{ id: 'thinkpad' }],
      },
    },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: {
        id: supplier.id,
      },
      update: {},
      create: {
        id: supplier.id,
        name: supplier.name,
        products: supplier.products,
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
