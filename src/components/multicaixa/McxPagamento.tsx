import McxReferenciaMontanteView from "./McxReferenciaMontanteView";

import type { PagamentoData } from "@/types";

export default function McxPagamento(props: NonNullable<PagamentoData>) {
  return <McxReferenciaMontanteView {...props} />;
}
