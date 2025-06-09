import { notFound } from "next/navigation";
import { api } from "@/server";
import { entidade } from "../dummyData";

import { Suspense } from "react";
import { Grid, GridHeader, ServicoLoader } from "@/components";

export default async function MulticaixaPage() {
  const { data: empresa } = await api.empresa.get();

  if (!empresa) {
    notFound();
  }

  return (
    <>
      <GridHeader empresaId={empresa.id} />
      <Grid>
        {entidade.servicos.length === 0 && <Grid.NoServico />}
        {entidade.servicos.length > 0 &&
          entidade.servicos.map((servico) => (
            <Grid.Servico key={servico.id} servico={servico}>
              {servico.produtos.length === 0 && <Grid.NoProduto />}
              {servico.produtos.length > 0 &&
                servico.produtos.map((produto) => (
                  <Grid.Produto {...produto} key={produto.id} />
                ))}
            </Grid.Servico>
          ))}
      </Grid>
      <Suspense fallback={<div>Loading...</div>}>
        <ServicoLoader id={empresa.id} />
      </Suspense>
    </>
  );
}

export const dynamic = "force-dynamic";
