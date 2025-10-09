import { mcxEmpresaStore } from "@/context/mcx";
import { openContextModal } from "@mantine/modals";

export const useEmpresaDisplayer = () => {
  const { nome } = mcxEmpresaStore();

  const openModal = () =>
    openContextModal({
      modal: "mcx-modal",
      size: 1200,
      innerProps: {
        type: "DATA",
      },
    });

  return {
    nome,
    openModal,
  };
};
