import { api } from "@/server";
import { redirect } from "next/navigation";
import { entidade } from "../dummyData";

import { EmpresaWidget } from "@/components/empresa";

import { Grid } from "@/components";

export default async function MulticaixaPage() {
  const { data: empresa, message: eMessage } = await api.empresa.get();

  if (!empresa) throw new Error(eMessage);

  const { data: servicos, message: sMessage } = await api.servico.getAll(
    empresa.id
  );

  //if (!servicos) throw new Error(sMessage);

  return (
    <>
      <EmpresaWidget {...empresa} />
      <Grid>
        {entidade.servicos.length === 0 && <Grid.NoServico />}
        {entidade.servicos.length > 0 &&
          entidade.servicos.map((servico) => (
            <Grid.Servico key={servico.id} title={servico.desig_ecra}>
              {servico.produtos.length === 0 && <Grid.NoProduto />}
              {servico.produtos.length > 0 &&
                servico.produtos.map((produto) => (
                  <Grid.Produto key={produto.id} title={produto.desig_ecra} />
                ))}
            </Grid.Servico>
          ))}
      </Grid>
    </>
  );
}
