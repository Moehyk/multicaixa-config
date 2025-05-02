/*
  Warnings:

  - You are about to drop the column `carregamentosId` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `hasFreeAmount` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `hasSingleAmount` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `maxFreeAmount` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `minFreeAmount` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `referenceName` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `referenceScreenText` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `referenceSize` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `singleAmount` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `singleAmountDescription` on the `Carregamento` table. All the data in the column will be lost.
  - You are about to drop the column `maxAmount` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `minAmount` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `referenceName` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `referenceScreenText` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `referenceSize` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `screenName` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `selectionName` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Recarga` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `Recarga` table. All the data in the column will be lost.
  - You are about to drop the column `entitadeId` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the column `screenName` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the column `selectionName_1` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the column `selectionName_2` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the column `systemName` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the `Carregamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entitade` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[produtoId]` on the table `Carregamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `desig_referencia` to the `Carregamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montante_livre` to the `Carregamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montante_pre_definido` to the `Carregamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montante_tipo` to the `Carregamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produtoId` to the `Carregamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamanho_referencia` to the `Carregamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texto_ecra_referencia` to the `Carregamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_referencia` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montante_maximo` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montante_minimo` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamanho_referencia` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texto_ecra_referencia` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_ecra` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_tecla_seleccao` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_montante` to the `Recarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_unidade` to the `Recarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_ecra` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_sistema` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_tecla_seleccao_1` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desig_tecla_seleccao_2` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suprimir_produtos` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MontanteTipo" AS ENUM ('montante_pre_definido', 'montante_livre', 'ambos');

-- DropForeignKey
ALTER TABLE "Carregamento" DROP CONSTRAINT "Carregamento_carregamentosId_fkey";

-- DropForeignKey
ALTER TABLE "Carregamentos" DROP CONSTRAINT "Carregamentos_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "Entitade" DROP CONSTRAINT "Entitade_utilizadorId_fkey";

-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_entitadeId_fkey";

-- AlterTable
ALTER TABLE "Carregamento" DROP COLUMN "carregamentosId",
DROP COLUMN "hasFreeAmount",
DROP COLUMN "hasSingleAmount",
DROP COLUMN "maxFreeAmount",
DROP COLUMN "minFreeAmount",
DROP COLUMN "referenceName",
DROP COLUMN "referenceScreenText",
DROP COLUMN "referenceSize",
DROP COLUMN "singleAmount",
DROP COLUMN "singleAmountDescription",
ADD COLUMN     "desig_referencia" TEXT NOT NULL,
ADD COLUMN     "montante_livre" BOOLEAN NOT NULL,
ADD COLUMN     "montante_maximo" INTEGER,
ADD COLUMN     "montante_minimo" INTEGER,
ADD COLUMN     "montante_pre_definido" BOOLEAN NOT NULL,
ADD COLUMN     "montante_tipo" "MontanteTipo" NOT NULL,
ADD COLUMN     "produtoId" TEXT NOT NULL,
ADD COLUMN     "tamanho_referencia" INTEGER NOT NULL,
ADD COLUMN     "texto_ecra_referencia" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "maxAmount",
DROP COLUMN "minAmount",
DROP COLUMN "referenceName",
DROP COLUMN "referenceScreenText",
DROP COLUMN "referenceSize",
ADD COLUMN     "desig_referencia" TEXT NOT NULL,
ADD COLUMN     "montante_maximo" INTEGER NOT NULL,
ADD COLUMN     "montante_minimo" INTEGER NOT NULL,
ADD COLUMN     "tamanho_referencia" INTEGER NOT NULL,
ADD COLUMN     "texto_ecra_referencia" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "screenName",
DROP COLUMN "selectionName",
ADD COLUMN     "desig_ecra" TEXT NOT NULL,
ADD COLUMN     "desig_tecla_seleccao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recarga" DROP COLUMN "amount",
DROP COLUMN "units",
ADD COLUMN     "desig_montante" INTEGER NOT NULL,
ADD COLUMN     "desig_unidade" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "entitadeId",
DROP COLUMN "screenName",
DROP COLUMN "selectionName_1",
DROP COLUMN "selectionName_2",
DROP COLUMN "systemName",
ADD COLUMN     "desig_ecra" TEXT NOT NULL,
ADD COLUMN     "desig_sistema" TEXT NOT NULL,
ADD COLUMN     "desig_tecla_seleccao_1" TEXT NOT NULL,
ADD COLUMN     "desig_tecla_seleccao_2" TEXT NOT NULL,
ADD COLUMN     "empresaId" TEXT NOT NULL,
ADD COLUMN     "suprimir_produtos" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Carregamentos";

-- DropTable
DROP TABLE "Entitade";

-- CreateTable
CREATE TABLE "Montante" (
    "id" TEXT NOT NULL,
    "carregamentoId" TEXT NOT NULL,
    "montante" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Montante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "cae" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "numero_pessoa_colectiva" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "morada" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "numero_entidade" INTEGER NOT NULL,
    "desig_ecra" TEXT NOT NULL,
    "desig_tecla_seleccao" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_utilizadorId_key" ON "Empresa"("utilizadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Carregamento_produtoId_key" ON "Carregamento"("produtoId");

-- AddForeignKey
ALTER TABLE "Montante" ADD CONSTRAINT "Montante_carregamentoId_fkey" FOREIGN KEY ("carregamentoId") REFERENCES "Carregamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carregamento" ADD CONSTRAINT "Carregamento_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
