import ProdutoItem from "./ProdutoItem";
import GridNoProduto from "./GridNoProduto";

import type { ProdutoData } from "@/types";

export default function GridProdutos({
  id,
  produtos,
}: {
  id: string;
  produtos: ProdutoData[];
}) {
  if (produtos.length === 0) return <GridNoProduto id={id} />;

  return (
    <>
      {produtos.map((produto) => (
        <ProdutoItem key={produto.id} {...produto} />
      ))}
    </>
  );
}
