import { useMulticaixaController } from "@/context/multicaixa-controller";

import McxToolbar from "./McxToolbar";
import McxWrapper from "./McxWrapper";
import McxHeader from "./McxHeader";
import McxDataLayer from "./McxDataLayer";

import { entidade } from "../../app/dummyData";

import type { Empresa } from "@prisma/client";

export default function Multicaixa({ desig_ecra }: Empresa) {
  const { view, servicoId } = useMulticaixaController();

  return (
    <McxWrapper>
      <McxToolbar title={entidade.desig_ecra} />
      <McxHeader />
      {view === "empresa" && (
        <McxDataLayer id={entidade.id} nextView="servico" empresa={entidade} />
      )}
      {view === "produto" && servicoId && (
        <McxDataLayer id={servicoId} nextView="produto" empresa={entidade} />
      )}
    </McxWrapper>
  );
}
