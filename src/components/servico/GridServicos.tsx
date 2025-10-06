"use client";

import { mcxDataStore } from "@/context/mcx";

import { Grid } from "@/components";
import ServicoItem from "./ServicoItem";

export default function GridServicos() {
  const { servicos } = mcxDataStore();

  return (
    <>
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
    </>
  );
}
