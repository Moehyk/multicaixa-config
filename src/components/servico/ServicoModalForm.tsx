import React from "react";

import { Button } from "@mantine/core";

import type { ContextModalProps } from "@mantine/modals";

export default function ServicoModalForm({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  id: string;
  empresaId: string;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <h2>ID: {innerProps.id}</h2>
      <h2>EmpresaID: {innerProps.empresaId}</h2>
      <Button onClick={() => context.closeModal(id)}>Close</Button>
    </div>
  );
}
