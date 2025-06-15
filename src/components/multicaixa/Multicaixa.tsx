import { useMulticaixaController } from "@/context/multicaixa-controller";

import McxToolbar from "./McxToolbar";
import McxWrapper from "./McxWrapper";
import McxHeader from "./McxHeader";
import McxDataLayer from "./McxDataLayer";

import { entidade } from "../../app/dummyData";

import type { Empresa } from "@prisma/client";
import { use } from "react";

export default function Multicaixa({ desig_ecra }: Empresa) {
  const {
    view,
    servicoId,
    recargasId,
    produtoTipo,
    pagamentoId,
    carregamentoId,
    produtoId,
  } = useMulticaixaController();

  console.log("view", view);
  console.log("produtoTipo", produtoTipo);
  console.log(useMulticaixaController.getState());

  return (
    <McxWrapper>
      <McxToolbar title={entidade.desig_ecra} />
      <McxHeader />
      {view === "empresa" && (
        <McxDataLayer id={entidade.id} nextView="servico" empresa={entidade} />
      )}
      {view === "servico" && servicoId && (
        <McxDataLayer id={servicoId} nextView="produto" empresa={entidade} />
      )}

      {view === "produto" && produtoId && produtoTipo === "recargas" && (
        <McxDataLayer
          id={produtoId}
          nextView="end"
          empresa={entidade}
          produtoTipo="recargas"
        />
      )}

      {view === "produto" && produtoId && produtoTipo === "carregamentos" && (
        <div>Carregamentos: {produtoId}</div>
      )}

      {view === "produto" && produtoId && produtoTipo === "pagamento" && (
        <div>Pagamento: {produtoId}</div>
      )}
    </McxWrapper>
  );
}
