import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const numberOfBuyers = 100;

  const buyers = Array.from({ length: numberOfBuyers }).map((_, index) => ({
    name: `Buyer ${index + 1}`,
  }));

  await prisma.buyer.createMany({
    data: buyers,
  });

  console.log(`${numberOfBuyers} buyers have been created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
