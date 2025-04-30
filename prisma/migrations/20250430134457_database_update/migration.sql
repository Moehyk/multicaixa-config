-- CreateEnum
CREATE TYPE "ProdutoTipo" AS ENUM ('pagamento', 'carregamentos', 'recargas');

-- CreateEnum
CREATE TYPE "RealTimeNotificationType" AS ENUM ('E038v03', 'E038v04');

-- CreateTable
CREATE TABLE "Carregamento" (
    "id" TEXT NOT NULL,
    "carregamentosId" TEXT NOT NULL,
    "referenceName" TEXT NOT NULL,
    "referenceSize" INTEGER NOT NULL,
    "referenceScreenText" TEXT NOT NULL,
    "hasSingleAmount" BOOLEAN,
    "singleAmountDescription" TEXT,
    "hasFreeAmount" BOOLEAN,
    "singleAmount" INTEGER,
    "maxFreeAmount" INTEGER,
    "minFreeAmount" INTEGER,

    CONSTRAINT "Carregamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carregamentos" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "Carregamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entitade" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "selectionName" TEXT NOT NULL,
    "screenName" TEXT NOT NULL,
    "checkDigit" BOOLEAN NOT NULL DEFAULT false,
    "useLeftZero" BOOLEAN NOT NULL,
    "validateReference" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Entitade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "referenceName" TEXT NOT NULL,
    "referenceSize" INTEGER NOT NULL,
    "referenceScreenText" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "maxAmount" INTEGER NOT NULL,
    "minAmount" INTEGER NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "selectionName" TEXT NOT NULL,
    "screenName" TEXT NOT NULL,
    "type" "ProdutoTipo" NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recarga" (
    "id" TEXT NOT NULL,
    "recargasId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Recarga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recargas" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "Recargas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "entitadeId" TEXT NOT NULL,
    "systemName" TEXT NOT NULL,
    "screenName" TEXT NOT NULL,
    "selectionName_1" TEXT NOT NULL,
    "selectionName_2" TEXT NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilizador" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "picture" TEXT,
    "name" TEXT,
    "surname" TEXT,

    CONSTRAINT "Utilizador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carregamentos_produtoId_key" ON "Carregamentos"("produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "Entitade_utilizadorId_key" ON "Entitade"("utilizadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_productId_key" ON "Pagamento"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Recargas_produtoId_key" ON "Recargas"("produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_id_key" ON "Utilizador"("id");

-- AddForeignKey
ALTER TABLE "Carregamento" ADD CONSTRAINT "Carregamento_carregamentosId_fkey" FOREIGN KEY ("carregamentosId") REFERENCES "Carregamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carregamentos" ADD CONSTRAINT "Carregamentos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entitade" ADD CONSTRAINT "Entitade_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recarga" ADD CONSTRAINT "Recarga_recargasId_fkey" FOREIGN KEY ("recargasId") REFERENCES "Recargas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recargas" ADD CONSTRAINT "Recargas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_entitadeId_fkey" FOREIGN KEY ("entitadeId") REFERENCES "Entitade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
