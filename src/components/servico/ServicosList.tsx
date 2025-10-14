"use client";

import { Grid, GridHeader } from "@/components";
import { ServicoItem } from ".";
import { mcxEmpresaStore } from "@/context/mcx";

export default function ServicosList() {
  const { id, servicos } = mcxEmpresaStore();

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
