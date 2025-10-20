import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { McxRecibo, McxModal } from "@/components/multicaixa";

import type { ModalsProviderProps } from "@mantine/modals";

const modals = {
  "confirm-delete": ConfirmDeleteModal,
  "mcx-modal": McxModal,
  "mcx-recibo": McxRecibo,
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
