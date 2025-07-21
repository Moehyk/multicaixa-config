import { getEmpresa } from "@/server/services";

import McxHeader from "./McxHeader";
import McxContentWrapper from "./McxContentWrapper";
import McxSelectionView from "./McxSelectionView";
import NoMcxView from "./NoMcxView";

import type { GridButton } from "@/types";

export default async function McxEmpresaView({}) {
  const { data } = await getEmpresa();

  if (!data) {
    return <NoMcxView dataModel="empresa" />;
  }

  const buttons: GridButton[] = [];

  if (data) {
    const { servicos } = data;
    buttons.push(
      ...servicos.map((servico) => ({
        id: servico.id,
        selectText: servico.desigTeclaSeleccao,
        screenText: servico.desigEcra,
        subtitle: "Escolha um produto",
      }))
    );
  }
  return (
    <>
      <McxHeader desigEcra={data.desigEcra} ecraSecondary="escolher serviço" />
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
