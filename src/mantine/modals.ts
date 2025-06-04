import { ServicoModalForm } from "@/components/servico";

import type { ModalsProviderProps } from "@mantine/modals";

const modals = {
  "criar-servico": ServicoModalForm,
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
