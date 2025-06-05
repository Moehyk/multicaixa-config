/*
  Warnings:

  - You are about to drop the column `desig_tecla_seleccao_1` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the column `desig_tecla_seleccao_2` on the `Servico` table. All the data in the column will be lost.
  - Added the required column `desig_tecla_seleccao` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "desig_tecla_seleccao_1",
DROP COLUMN "desig_tecla_seleccao_2",
ADD COLUMN     "desig_tecla_seleccao" TEXT NOT NULL;
