-- AlterTable
ALTER TABLE "Carregamento" ALTER COLUMN "montante_maximo" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "montante_minimo" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "cae" SET DATA TYPE TEXT,
ALTER COLUMN "numero_entidade" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Montante" ALTER COLUMN "montante" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Pagamento" ALTER COLUMN "montante_maximo" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "montante_minimo" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Recarga" ALTER COLUMN "desig_montante" SET DATA TYPE DOUBLE PRECISION;
