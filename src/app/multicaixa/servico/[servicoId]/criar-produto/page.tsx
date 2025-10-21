import { getServico } from "@/server/services";

import { CriarProduto } from "@/components";

export default async function CriarProdutoPage({
  params,
}: {
  params: Promise<{ servicoId: string }>;
}) {
  const { servicoId } = await params;

  const { data } = await getServico(servicoId);

  if (!data) {
    return <div>Ups...</div>;
  }

  return <CriarProduto id={servicoId} headerText={data.desigSistema} />;
}
