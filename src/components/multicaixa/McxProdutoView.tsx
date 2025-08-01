import { useMcxDataStore, useViewStore } from "@/context/mcx";

import McxScreenText from "./McxScreenText";
import NoMcxView from "./NoMcxView";
import McxRecargas from "./McxRecargas";

import type { ProdutoData } from "@/types";

const renderProdutoView = (produto: ProdutoData) => {
  switch (produto.type) {
    case "pagamento":
      return <div>Pagamento</div>;
    case "recargas":
      return (
        <McxRecargas
          montantes={produto.recargas.montantes}
          designacao={produto.recargas.desigUnidade}
        />
      );
    case "carregamentos":
      return <div>Carregamento</div>;
    default:
      const _exhaustiveCheck: never = produto;
      return null;
  }
};

export default function McxProdutoView() {
  const { id } = useViewStore();
  const { getProduto } = useMcxDataStore();
  const produto = getProduto(id);

  if (!produto) return <NoMcxView text="Produto não encontrado." />;

  return (
    <>
      <McxScreenText subtext={produto.desigEcra} />
      {renderProdutoView(produto)}
    </>
  );
}
