/*
  Warnings:

  - You are about to drop the column `productId` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Recarga` table. All the data in the column will be lost.
  - You are about to drop the column `suprimir_produtos` on the `Servico` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produtoId]` on the table `Pagamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `produtoId` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicoId` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pagamento" DROP CONSTRAINT "Pagamento_productId_fkey";

-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_serviceId_fkey";

-- DropIndex
DROP INDEX "Pagamento_productId_key";

-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "productId",
ADD COLUMN     "produtoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "serviceId",
ADD COLUMN     "servicoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recarga" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "suprimir_produtos";

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_produtoId_key" ON "Pagamento"("produtoId");

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
