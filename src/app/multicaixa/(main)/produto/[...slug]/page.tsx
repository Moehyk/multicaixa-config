import { getProduto } from "@/server/services";
import { notFound } from "next/navigation";
import { sortDataArray } from "@/utils/sort-data-array";

import {
  UpdatePagamento,
  UpdateRecargas,
  UpdateCarregamento,
} from "@/components/produto";

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

  if (data.type === "pagamento" && data.pagamento) {
    return <UpdatePagamento {...data} />;
  }

  if (data.type === "recargas" && data.recargas) {
    data.recargas.montantes = sortDataArray(data.recargas.montantes);

    return <UpdateRecargas {...data} />;
  }

  if (data.type === "carregamentos" && data.carregamento) {
    data.carregamento.montantes = sortDataArray(data.carregamento.montantes);

    return <UpdateCarregamento {...data} />;
  }
}
