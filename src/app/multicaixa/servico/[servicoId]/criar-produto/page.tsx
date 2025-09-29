import { getServico } from "@/server/services";
import { notFound } from "next/navigation";

import { CriarProduto } from "@/components/produto";
import { Card } from "@mantine/core";

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
    <Card p={32} withBorder>
      <CriarProduto
        id={servicoId}
        header={data.desigSistema}
        subheader="Criar Produto"
      />
    </Card>
  );
}
