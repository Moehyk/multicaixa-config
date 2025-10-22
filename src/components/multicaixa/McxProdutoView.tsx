import { useMcxData } from "@/hooks/mcx-data";

import McxScreenText from "./McxScreenText";
import NoMcxView from "./NoMcxView";
import McxRecargas from "./McxRecargas";
import McxPagamento from "./McxPagamento";
import McxCarregamentos from "./McxCarregamentos";

import type { ProdutoData } from "@/types";

const renderProdutoView = (produto: ProdutoData) => {
  switch (produto.type) {
    case "pagamento":
      return <McxPagamento {...produto.pagamento} />;
    case "recargas":
      return (
        <McxRecargas
          montantes={produto.recargas.montantes}
          designacao={produto.recargas.desigUnidade}
        />
      );
    case "carregamentos":
      return <McxCarregamentos {...produto.carregamento} />;
    default:
      const _exhaustiveCheck: never = produto;
      return null;
  }
};

export default function McxProdutoView() {
  const { produto } = useMcxData();

  if (!produto) return <NoMcxView view="produto" />;

  return (
    <>
      <McxScreenText subtext={produto.desigEcra} />
      {renderProdutoView(produto)}
    </>
  );
}
