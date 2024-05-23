/*
  Warnings:

  - You are about to drop the `_ProductToSupplier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToSupplier" DROP CONSTRAINT "ProductId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSupplier" DROP CONSTRAINT "supplierId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "qty" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductToSupplier";

-- CreateTable
CREATE TABLE "_ProductSupplier" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductSupplier_AB_unique" ON "_ProductSupplier"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductSupplier_B_index" ON "_ProductSupplier"("B");

-- AddForeignKey
ALTER TABLE "_ProductSupplier" ADD CONSTRAINT "_ProductSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductSupplier" ADD CONSTRAINT "_ProductSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
