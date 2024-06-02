const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed para Suppliers
  const suppliers = [
    { id: 'supplierA', name: 'SupplierA' },
    { id: 'supplierB', name: 'SupplierB' },
    { id: 'supplierC', name: 'SupplierC' },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: {
        id: supplier.id,
      },
      update: {
        name: supplier.name,
        // No es necesario actualizar productos
      },
      create: {
        id: supplier.id,
        name: supplier.name,
        // No es necesario especificar productos aquí
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
