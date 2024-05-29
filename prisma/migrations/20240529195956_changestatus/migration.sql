/*
  Warnings:

  - You are about to drop the `Shipements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "STATUS" ADD VALUE 'CROSSDOCKING';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "STATUS" NOT NULL;

-- DropTable
DROP TABLE "Shipements";
