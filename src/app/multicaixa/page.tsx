import { api } from "@/server";
import { redirect } from "next/navigation";
import { entidade } from "../dummyData";

import { Grid } from "@/components";

export default async function MulticaixaPage() {
  const { data, message } = await api.empresa.get();

  if (!data) throw new Error(message);

  const { servicos } = data;

  return (
    <>
      <Grid>
        {entidade.servicos.length === 0 && <Grid.NoServico />}
        {entidade.servicos.length > 0 &&
          entidade.servicos.map((servico) => (
            <Grid.Servico key={servico.id} title={servico.desig_ecra}>
              {servico.produtos.length === 0 && <Grid.NoProduto />}
              {servico.produtos.length > 0 &&
                servico.produtos.map((produto) => (
                  <Grid.Produto {...produto} key={produto.id} />
                ))}
            </Grid.Servico>
          ))}
      </Grid>
    </>
  );
}
