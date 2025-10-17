"use client";

import { mcxEmpresaStore } from "@/context/mcx";

import { Grid, GridHeader, NoEmpresa } from "@/components";
import { ServicoItem } from ".";

import type { ServicoData } from "@/types";

export default function ServicosList({
  empresaId,
  servicos,
}: {
  empresaId: string;
  servicos: ServicoData[];
}) {
  return (
    <>
      <GridHeader id={empresaId} />
      <Grid>
        {servicos.map((servico) => (
          <ServicoItem key={servico.id} servico={servico}>
            <>
              {servico.produtos.length === 0 && (
                <Grid.NoProduto id={servico.id} />
              )}
              {servico.produtos.length > 0 && (
                <Grid.Produtos key={servico.id} produtos={servico.produtos} />
              )}
            </>
          </ServicoItem>
        ))}
      </Grid>
    </>
  );
}
