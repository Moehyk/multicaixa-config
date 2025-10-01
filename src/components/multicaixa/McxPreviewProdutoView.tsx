import { useAppPreviewStore } from "@/context/mcx";

import McxScreenText from "./McxScreenText";
import McxRecargas from "./McxRecargas";
import McxPagamento from "./McxPagamento";
import McxCarregamentos from "./McxCarregamentos";

import type { McxProdutoPreview } from "@/types";

export const renderProdutoView = (produto: McxProdutoPreview) => {
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

export default function McxPreviewProdutoView() {
  const { produto } = useAppPreviewStore();
  return (
    <>
      <McxScreenText subtext={produto.desigEcra} />
      {renderProdutoView(produto)}
    </>
  );
}
