import { api } from "@/server";
import { entidade } from "../dummyData";

import { Grid, GridHeader } from "@/components";

export default async function MulticaixaPage() {
  const { data, message } = await api.empresa.get();

  if (!data) throw new Error(message);

  const { servicos, id } = data;

  return (
    <>
      <GridHeader empresaId={id} />
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
        {servicos.length === 0 && <Grid.NoServico />}
        {servicos.length > 0 &&
          servicos.map((servico) => (
            <Grid.Servico key={servico.id} servico={servico}></Grid.Servico>
          ))}
      </Grid>
    </>
  );
}
