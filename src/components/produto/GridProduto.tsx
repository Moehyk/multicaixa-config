import ProdutoItem from "./ProdutoItem";

import type { Produto } from "@prisma/client";

export default function GridProduto({ produtos }: { produtos: Produto[] }) {
  return (
    <>
      {produtos.map((produto) => (
        <ProdutoItem key={produto.id} {...produto} />
      ))}
    </>
  );
}
