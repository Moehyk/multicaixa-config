import { CriarProdutoForm } from "@/components/produto";

export default async function CriarProdutoPage({
  params,
}: {
  params: Promise<{ servicoId: string }>;
}) {
  const { servicoId } = await params;

  return <CriarProdutoForm id={servicoId} />;
}
