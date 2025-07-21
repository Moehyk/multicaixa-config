/*
  Warnings:

  - You are about to drop the `CarrMontante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Carregamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pagamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecaMontante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recargas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Utilizador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarrMontante" DROP CONSTRAINT "CarrMontante_carregamentoId_fkey";

-- DropForeignKey
ALTER TABLE "Carregamento" DROP CONSTRAINT "Carregamento_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_utilizadorId_fkey";

-- DropForeignKey
ALTER TABLE "Pagamento" DROP CONSTRAINT "Pagamento_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "RecaMontante" DROP CONSTRAINT "RecaMontante_recargaId_fkey";

-- DropForeignKey
ALTER TABLE "Recargas" DROP CONSTRAINT "Recargas_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_empresaId_fkey";

-- DropTable
DROP TABLE "CarrMontante";

-- DropTable
DROP TABLE "Carregamento";

-- DropTable
DROP TABLE "Empresa";

-- DropTable
DROP TABLE "Pagamento";

-- DropTable
DROP TABLE "Produto";

-- DropTable
DROP TABLE "RecaMontante";

-- DropTable
DROP TABLE "Recargas";

-- DropTable
DROP TABLE "Servico";

-- DropTable
DROP TABLE "Utilizador";

-- CreateTable
CREATE TABLE "utilizador" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "picture" TEXT,
    "name" TEXT,
    "surname" TEXT,

    CONSTRAINT "utilizador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa" (
    "id" TEXT NOT NULL,
    "utilizador_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cae" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numero_pessoa_colectiva" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "morada" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numero_entidade" TEXT NOT NULL,
    "desig_ecra" TEXT NOT NULL,
    "desig_tecla_seleccao" TEXT NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servico" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "empresa_id" TEXT NOT NULL,
    "desig_sistema" TEXT NOT NULL,
    "desig_ecra" TEXT NOT NULL,
    "desig_tecla_seleccao" TEXT NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "servico_id" TEXT NOT NULL,
    "desig_ecra" TEXT NOT NULL,
    "desig_tecla_seleccao" TEXT NOT NULL,
    "type" "ProdutoTipo" NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carregamento" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "produto_id" TEXT NOT NULL,
    "desig_referencia" TEXT NOT NULL,
    "tamanho_referencia" INTEGER NOT NULL,
    "texto_ecra_referencia" TEXT NOT NULL,
    "montante_tipo" "MontanteTipo" NOT NULL,
    "montante_minimo" DOUBLE PRECISION,
    "montante_maximo" DOUBLE PRECISION,

    CONSTRAINT "carregamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "desig_referencia" TEXT NOT NULL,
    "tamanho_referencia" INTEGER NOT NULL,
    "texto_ecra_referencia" TEXT NOT NULL,
    "is_new" BOOLEAN NOT NULL DEFAULT true,
    "montante_minimo" DOUBLE PRECISION NOT NULL,
    "montante_maximo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recargas" (
    "id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "desig_unidade" TEXT NOT NULL,

    CONSTRAINT "recargas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carregamento_montante" (
    "id" TEXT NOT NULL,
    "carregamento_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "montante" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "carregamento_montante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recarga_montante" (
    "id" TEXT NOT NULL,
    "recarga_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "montante" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "recarga_montante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilizador_id_key" ON "utilizador"("id");

-- CreateIndex
CREATE UNIQUE INDEX "empresa_utilizador_id_key" ON "empresa"("utilizador_id");

-- CreateIndex
CREATE UNIQUE INDEX "carregamento_produto_id_key" ON "carregamento"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "pagamento_produto_id_key" ON "pagamento"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "recargas_produto_id_key" ON "recargas"("produto_id");

-- AddForeignKey
ALTER TABLE "empresa" ADD CONSTRAINT "empresa_utilizador_id_fkey" FOREIGN KEY ("utilizador_id") REFERENCES "utilizador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carregamento" ADD CONSTRAINT "carregamento_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recargas" ADD CONSTRAINT "recargas_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carregamento_montante" ADD CONSTRAINT "carregamento_montante_carregamento_id_fkey" FOREIGN KEY ("carregamento_id") REFERENCES "carregamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recarga_montante" ADD CONSTRAINT "recarga_montante_recarga_id_fkey" FOREIGN KEY ("recarga_id") REFERENCES "recargas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
