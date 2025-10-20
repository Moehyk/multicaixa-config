import React from "react";
import { Button } from "@mantine/core";

import type { ContextModalProps } from "@mantine/modals";

export default function McxRecibo({ context, id }: ContextModalProps<{}>) {
  return (
    <div>
      <p>Reciboe Modal</p>
      <Button onClick={() => context.closeModal(id)}>Fechar</Button>
    </div>
  );
}
