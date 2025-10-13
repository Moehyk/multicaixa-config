"use client";

import { mcxEmpresaStore } from "@/context/mcx";

import { Grid, GridHeader } from "@/components";
import { ServicoItem } from ".";

export default function ServicosList() {
  const { servicos, id } = mcxEmpresaStore();

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
