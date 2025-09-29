import { getServico } from "@/server/services";
import { notFound } from "next/navigation";

import { ProdutoFormCard } from "@/components/forms";
import { CriarProduto } from "@/components/produto";

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
    <ProdutoFormCard header={data.desigSistema} subheader="Criar Produto">
      <CriarProduto id={servicoId} />
    </ProdutoFormCard>
  );
}
