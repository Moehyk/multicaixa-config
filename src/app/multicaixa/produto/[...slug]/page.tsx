import { getProduto } from "@/server/services";
import { notFound } from "next/navigation";
import { sortDataArray } from "@/utils/sort-data-array";

import {
  UpdatePagamento,
  UpdateRecargas,
  UpdateCarregamento,
} from "@/components/produto";
import type { ProdutoTipo } from "@prisma/client";

const renderProduto = (type: ProdutoTipo, data: any) => {
  switch (type) {
    case "pagamento":
      return <UpdatePagamento {...data} />;
    case "recargas": {
      data.recargas.montantes = sortDataArray(data.recargas.montantes);
      return <UpdateRecargas {...data} />;
    }
    case "carregamentos": {
      data.carregamento.montantes = sortDataArray(data.carregamento.montantes);
      return <UpdateCarregamento {...data} />;
    }
    default:
      return null;
  }
};

export default async function DynamicProdutoPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const { data } = await getProduto(slug[0]);

  if (!data) {
    notFound();
  }

  return <>{renderProduto(data.type, data)}</>;
}
