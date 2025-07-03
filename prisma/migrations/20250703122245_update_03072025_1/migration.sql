-- DropForeignKey
ALTER TABLE "CarrMontante" DROP CONSTRAINT "CarrMontante_carregamentoId_fkey";

-- AddForeignKey
ALTER TABLE "CarrMontante" ADD CONSTRAINT "CarrMontante_carregamentoId_fkey" FOREIGN KEY ("carregamentoId") REFERENCES "Carregamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
