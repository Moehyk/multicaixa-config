import { mcxPreviewStore } from "@/context/mcx/preview-store";
import { openContextModal } from "@mantine/modals";

import type { AllFormTypes } from "@/types";

export const openPreviewModal = <T extends AllFormTypes>(
  getValues: () => T
) => {
  const values = getValues();

  if ("carregamento" in values) {
    mcxPreviewStore.setState({
      produto: {
        ...mcxPreviewStore.getState().produto,
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "carregamentos",
        carregamento: values.carregamento!,
      },
    });
  } else if ("pagamento" in values) {
    mcxPreviewStore.setState({
      produto: {
        ...mcxPreviewStore.getState().produto,
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "pagamento",
        pagamento: values.pagamento!,
      },
    });
  } else if ("recargas" in values) {
    mcxPreviewStore.setState({
      produto: {
        ...mcxPreviewStore.getState().produto,
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "recargas",
        recargas: values.recargas!,
      },
    });
  }

  openContextModal({
    modal: "mcx-modal",
    size: 1200,
    innerProps: {
      app: {
        type: "PREVIEW",
      },
    },
  });
};
