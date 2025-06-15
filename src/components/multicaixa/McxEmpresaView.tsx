import { api } from "@/server";

import McxHeader from "./McxHeader";
import McxContentWrapper from "./McxContentWrapper";
import McxSelectionView from "./McxSelectionView";
import NoMcxView from "./NoMcxView";

import type { GridButton } from "@/types";

export default async function McxEmpresaView({}) {
  const { data } = await api.empresa.get();

  if (!data) {
    return <NoMcxView dataModel="empresa" />;
  }

  const buttons: GridButton[] = [];

  if (data) {
    const { servicos } = data;
    buttons.push(
      ...servicos.map((servico) => ({
        id: servico.id,
        selectText: servico.desig_tecla_seleccao,
        screenText: servico.desig_ecra,
        subtitle: "Escolha um produto",
      }))
    );
  }
  return (
    <>
      <McxHeader desigEcra={data.desig_ecra} ecraSecondary="escolher serviço" />
      <McxContentWrapper>
        {(!buttons || buttons.length === 0) && (
          <NoMcxView dataModel="empresa" />
        )}
        {buttons && buttons.length > 0 && (
          <McxSelectionView buttons={buttons} target="servico" isDefault />
        )}
      </McxContentWrapper>
    </>
  );
}
