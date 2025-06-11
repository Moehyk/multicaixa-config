import { api } from "@/server";
import { entidade } from "../dummyData";

import { Grid, GridHeader } from "@/components";
import { NoEmpresa, Empresa } from "@/components/empresa";

export default async function MulticaixaPage() {
  const { data: empresa } = await api.empresa.get();

  if (!empresa) {
    return <NoEmpresa />;
  }

  return (
    <>
      <div className="mb-16">
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
      </div>
      <Empresa {...empresa} />
    </>
  );
}

export const dynamic = "force-dynamic";
