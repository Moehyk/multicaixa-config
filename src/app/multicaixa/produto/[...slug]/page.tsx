import { getProduto } from "@/server/services";
import { notFound } from "next/navigation";
import { sortDataArray, renderServicoNomeParam } from "@/utils";

import {
  FormCard,
  UpdatePagamento,
  UpdateRecargas,
  UpdateCarregamento,
} from "@/components";

import type { ProdutoData } from "@/types";
import type { SearchParams } from "nuqs";

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
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { s } = await searchParams;

  const { data } = await getProduto(slug[0]);

  if (!data) {
    notFound();
  }

  const servicoDesigSistema = renderServicoNomeParam(s);

  return (
    <FormCard header={servicoDesigSistema} subheader={data.desigEcra}>
      {renderProduto(data)}
    </FormCard>
  );
}
