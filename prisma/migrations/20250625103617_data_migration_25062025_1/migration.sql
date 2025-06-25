/*
  Warnings:

  - You are about to drop the column `montante_livre` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `montante_pre_definido` on the `Carregamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carregamento" DROP COLUMN "montante_livre",
DROP COLUMN "montante_pre_definido";
