/*
  Warnings:

  - You are about to drop the column `montantes` on the `Recargas` table. All the data in the column will be lost.
  - You are about to drop the `Montante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Montante" DROP CONSTRAINT "Montante_carregamentoId_fkey";

-- AlterTable
ALTER TABLE "Recargas" DROP COLUMN "montantes";

-- DropTable
DROP TABLE "Montante";

-- CreateTable
CREATE TABLE "CarrMontante" (
    "id" TEXT NOT NULL,
    "carregamentoId" TEXT NOT NULL,
    "montante" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "CarrMontante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecaMontante" (
    "id" TEXT NOT NULL,
    "recargaId" TEXT NOT NULL,
    "montante" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "RecaMontante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarrMontante" ADD CONSTRAINT "CarrMontante_carregamentoId_fkey" FOREIGN KEY ("carregamentoId") REFERENCES "Carregamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecaMontante" ADD CONSTRAINT "RecaMontante_recargaId_fkey" FOREIGN KEY ("recargaId") REFERENCES "Recargas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
