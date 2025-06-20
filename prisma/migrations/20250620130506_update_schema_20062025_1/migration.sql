/*
  Warnings:

  - You are about to drop the column `descricao` on the `RecaMontante` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `RecaMontante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecaMontante" DROP COLUMN "descricao",
ADD COLUMN     "quantidade" INTEGER NOT NULL;
