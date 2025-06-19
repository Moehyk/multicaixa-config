/*
  Warnings:

  - You are about to drop the `Recarga` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `desig_unidade` to the `Recargas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recarga" DROP CONSTRAINT "Recarga_recargasId_fkey";

-- AlterTable
ALTER TABLE "Recargas" ADD COLUMN     "desig_unidade" TEXT NOT NULL,
ADD COLUMN     "montantes" INTEGER[];

-- DropTable
DROP TABLE "Recarga";
