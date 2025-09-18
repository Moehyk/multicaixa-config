import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import McxModal from "@/components/multicaixa/McxModal";

import type { ModalsProviderProps } from "@mantine/modals";

const modals = {
  "confirm-delete": ConfirmDeleteModal,
  "mcx-modal": McxModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export const modalsOptions: ModalsProviderProps = {
  modals,
  modalProps: {
    centered: true,
    withCloseButton: false,
  },
};
