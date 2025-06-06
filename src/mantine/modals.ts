import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

import type { ModalsProviderProps } from "@mantine/modals";

const modals = {
  "confirm-delete": ConfirmDeleteModal,
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
