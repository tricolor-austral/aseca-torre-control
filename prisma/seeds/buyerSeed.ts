import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed para Buyers
  for (let i = 1; i <= 10; i++) {
    await prisma.buyer.create({
      data: {
        id: `buyer_${i.toString()}`, // Convertir el índice a cadena
        name: 'Nombre del Comprador',
      },
    });
  }

  // Seed para Productos
  const productos = [
    { price: 10.99, qty: 100 },
    { price: 20.99, qty: 50 },
    { price: 5.99, qty: 200 },
    { price: 15.99, qty: 75 },
    { price: 8.99, qty: 150 },
  ];

  for (const producto of productos) {
    await prisma.product.create({
      data: producto,
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
