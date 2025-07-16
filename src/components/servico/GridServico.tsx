import { getServicos } from "@/server/services";

import { Grid, GridError } from "@/components";

export default async function GridServico({ id }: { id: string }) {
  const { data } = await getServicos(id);

  if (!data) {
    return <GridError message="Não foi possível carregar os serviços." />;
  }

  return (
    <>
      {data && data.length === 0 && <Grid.NoServico />}
      {data.length > 0 &&
        data.map((servico) => (
          <Grid.Servico key={servico.id} servico={servico}>
            <>
              {servico.produtos.length === 0 && (
                <Grid.NoProduto id={servico.id} />
              )}
              {servico.produtos.length > 0 && (
                <Grid.Produto key={servico.id} produtos={servico.produtos} />
              )}
            </>
          </Grid.Servico>
        ))}
    </>
  );
}
