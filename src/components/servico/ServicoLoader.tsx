import { getServicos } from "@/server/actions";

import { Grid, GridError } from "@/components";

export default async function ServicoLoader({ id }: { id: string }) {
  const { data } = await getServicos(id);

  if (!data) {
    return <GridError message="Não foi possível carregar os serviços." />;
  }
  return (
    <>
      {data && data.length === 0 && <Grid.NoServico />}
      {data.length > 0 &&
        data.map((servico) => (
          <Grid.Servico key={servico.id} servico={servico}></Grid.Servico>
        ))}
    </>
  );
}
