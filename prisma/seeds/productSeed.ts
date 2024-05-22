import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const products = Array.from({ length: 10 }).map(() => ({
    id: uuidv4(),
    price: parseFloat((Math.random() * 100).toFixed(2)),
  }));

  await prisma.product.createMany({
    data: products,
  });

  console.log('Seeded 10 products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
