import { getServico } from "@/server/services";

import { CriarProduto, ErrorWidget } from "@/components";

export default async function CriarProdutoPage({
  params,
}: {
  params: Promise<{ servicoId: string }>;
}) {
  const { servicoId } = await params;

  const { data, error, message } = await getServico(servicoId);

  if (error) {
    return <ErrorWidget message={message} />;
  }

  if (!data) {
    return <ErrorWidget message="Serviço não encontrado" />;
  }

  return <CriarProduto id={servicoId} headerText={data.desigSistema} />;
}
