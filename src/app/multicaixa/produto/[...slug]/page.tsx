import { getProduto } from "@/server/services";
import { notFound } from "next/navigation";
import { sortDataArray } from "@/utils/arrays";

import {
  ErrorWidget,
  UpdatePagamento,
  UpdateRecargas,
  UpdateCarregamento,
} from "@/components";

import type { ProdutoData } from "@/types";

const renderProduto = (data: ProdutoData) => {
  switch (data.type) {
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

  const { data, error, message } = await getProduto(slug[0]);

  if (error) {
    return <ErrorWidget message={message} />;
  }

  if (!data) {
    notFound();
  }

  return <>{renderProduto(data)}</>;
}
