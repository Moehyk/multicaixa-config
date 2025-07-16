import { getProduto } from "@/server/services";
import { notFound } from "next/navigation";

import { UpdatePagamento } from "@/components/produto";

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
    const { pagamento } = data;

    return <UpdatePagamento produto={data} pagamento={pagamento} />;
  }
}
