"use client";

import { Grid, GridHeader } from "@/components";
import { ServicoItem } from ".";

import type { ServicoData } from "@/types";

export default function ServicosList({
  servicos,
  id,
}: {
  servicos: ServicoData[];
  id: string;
}) {
  return (
    <>
      <GridHeader id={id} />
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
