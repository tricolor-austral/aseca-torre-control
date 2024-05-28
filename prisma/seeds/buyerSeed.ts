const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  async function main() {
    // Seed para Buyers
    for (let i = 1; i <= 10; i++) {
      await prisma.buyer.create({
        data: {
          id: `bugher_${i.toString()}`, // Convertir el índice a cadena
          name: 'Nombre del Comprador',
        },
      });
    }

    // Seed para Productos
    const productos = [
      {id: "11", price: 10.99, qty: 100},
      {id: "p1", price: 20.99, qty: 10000},
      {id: "p2", price: 5.99, qty: 100000},
      {id: "4", price: 15.99, qty: 75},
      {id: "5", price: 8.99, qty: 150},
    ];


    for (const producto of productos) {
      await prisma.product.create({
        data: producto,
      });
    }

    //seed para suppliers
    for (let i = 1; i <= 10; i++) {
      await prisma.supplier.create({
        data: {
          id: `subbblier_${i.toString()}`, // Convertir el índice a cadena
          name: 'suplier name',
          products: {
            connect: [{
              id: `p1`
              // Convertir el índice a cadena
            },
              {
                id: `p2`
              }
            ]
          }

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
