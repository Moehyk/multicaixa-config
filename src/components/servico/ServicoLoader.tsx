"use server";

import { api } from "@/server";

export default async function ServicoLoader({ id }: { id: string }) {
  const { data: servicos } = await api.servico.getAll(id);

  if (!servicos) {
    return <div>Ups, no data!</div>;
  }
  return <div>Servico Loader</div>;
}
