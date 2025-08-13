import ProdutoItem from "./ProdutoItem";

import type { ProdutoData } from "@/types";

export default function GridProduto({ produtos }: { produtos: ProdutoData[] }) {
  return (
    <>
      {produtos.map((produto) => (
        <ProdutoItem key={produto.id} {...produto} />
      ))}
    </>
  );
}
