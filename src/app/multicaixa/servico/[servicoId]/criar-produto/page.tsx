import { getServico } from "@/server/services";
import { notFound } from "next/navigation";

import { CriarProduto, FormCard } from "@/components";

export default async function CriarProdutoPage({
  params,
}: {
  params: Promise<{ servicoId: string }>;
}) {
  const { servicoId } = await params;

  const { data } = await getServico(servicoId);

  if (!data) {
    notFound();
  }

  return (
    <FormCard header={data.desigSistema} subheader="Criar Produto">
      <CriarProduto id={servicoId} />
    </FormCard>
  );
}
