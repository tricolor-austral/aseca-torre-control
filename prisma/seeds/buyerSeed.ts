const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Supplier 1',
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'Supplier 2',
    },
  });

  // Crear productos
  const product1 = await prisma.product.create({
    data: {
      price: 10.0,
      qty: 100,
      supplier: { connect: { id: supplier1.id } },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      price: 20.0,
      qty: 200,
      supplier: { connect: { id: supplier1.id } },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      price: 30.0,
      qty: 300,
      supplier: { connect: { id: supplier2.id } },
    },
  });

  const product4 = await prisma.product.create({
    data: {
      price: 40.0,
      qty: 400,
      supplier: { connect: { id: supplier2.id } },
    },
  });

  const product5 = await prisma.product.create({
    data: {
      price: 50.0,
      qty: 500,
      supplier: { connect: { id: supplier1.id } },
    },
  });

  // Crear buyers
  const buyer1 = await prisma.buyer.create({
    data: {
      name: 'Buyer 1',
    },
  });

  const buyer2 = await prisma.buyer.create({
    data: {
      name: 'Buyer 2',
    },
  });

  const buyer3 = await prisma.buyer.create({
    data: {
      name: 'Buyer 3',
    },
  });

  console.log({
    supplier1,
    supplier2,
    product1,
    product2,
    product3,
    product4,
    product5,
    buyer1,
    buyer2,
    buyer3,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
