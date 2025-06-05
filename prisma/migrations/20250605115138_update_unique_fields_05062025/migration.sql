/*
  Warnings:

  - A unique constraint covering the columns `[carregamentoId]` on the table `Montante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servicoId]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recargasId]` on the table `Recarga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[empresaId]` on the table `Servico` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Montante_carregamentoId_key" ON "Montante"("carregamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_servicoId_key" ON "Produto"("servicoId");

-- CreateIndex
CREATE UNIQUE INDEX "Recarga_recargasId_key" ON "Recarga"("recargasId");

-- CreateIndex
CREATE UNIQUE INDEX "Servico_empresaId_key" ON "Servico"("empresaId");
