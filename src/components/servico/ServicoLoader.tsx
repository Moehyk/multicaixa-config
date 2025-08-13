import { getServicos } from "@/server/services";

import { GridError, Grid } from "@/components";

export default async function ServicoLoader({ id }: { id: string }) {
  const { data } = await getServicos(id);

  if (!data) {
    return <GridError message="Não foi possível carregar os serviços." />;
  }

  if (data.length === 0) {
    return <Grid.NoServico />;
  }

  return <Grid.Servicos servicos={data} />;
}
