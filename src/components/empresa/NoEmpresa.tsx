"use client";

import { modals } from "@mantine/modals";

import CriarEmpresaModal from "./CriarEmpresaModal";
import { Card, Button, ThemeIcon } from "@mantine/core";
import { IconHomePlus } from "@tabler/icons-react";

export default function NoEmpresa() {
  return (
    <Card
      withBorder
      w={256}
      h={256}
      className="items-center justify-center gap-2 mx-auto mt-20"
    >
      <ThemeIcon variant="transparent" radius={9999} size={128}>
        <IconHomePlus size={96} stroke={1.75} />
      </ThemeIcon>
      <Button
        onClick={() =>
          modals.open({
            title: "Criar Empresa",
            size: "xl",
            children: <CriarEmpresaModal />,
            withCloseButton: true,
          })
        }
      >
        Criar Empresa
      </Button>
    </Card>
  );
}
