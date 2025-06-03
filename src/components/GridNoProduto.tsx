import React from "react";

import { Card, Button, ThemeIcon, Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function GridNoProduto() {
  const icon = <IconExclamationCircle />;

  return (
    <Alert
      variant="outline"
      color="brand"
      title="Este serviço não possui produtos"
      icon={icon}
      className="self-center bg-white"
    >
      <Button size="xs">Adicionar Produto</Button>
    </Alert>
  );
}
