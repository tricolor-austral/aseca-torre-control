import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const suppliers = Array.from({ length: 5 }).map((_, index) => ({
    id: uuidv4(),
    name: `Supplier ${index + 1}`,
  }));

  await prisma.supplier.createMany({
    data: suppliers,
  });

  console.log('Seeded 5 suppliers');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
