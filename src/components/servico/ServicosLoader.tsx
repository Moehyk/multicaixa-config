import { getServicos } from "@/server/services";

import { ServicosList } from "@/components/servico";

export default async function ServicosLoader({ id }: { id: string }) {
  const { data } = await getServicos(id);

  if (!data) {
    return null;
  }

  return <ServicosList id={id} servicos={data} />;
}
