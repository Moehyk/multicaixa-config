"use client";

import { mcxDataStore } from "@/context/mcx";
import { openContextModal } from "@mantine/modals";

import Link from "next/link";
import { Button } from "@mantine/core";
import { IconEdit, IconDeviceDesktop } from "@tabler/icons-react";

export default function EmpresaToolbar() {
  const { nome } = mcxDataStore();

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-semibold mb-4">{nome}</h2>
      <div className="flex gap-4">
        <Button
          size="md"
          variant="default"
          component={Link}
          href="/multicaixa/empresa"
          color="black"
          rightSection={<IconEdit size={20} />}
        >
          Editar Empresa
        </Button>
        <Button
          size="md"
          variant="default"
          onClick={() =>
            openContextModal({
              modal: "mcx-modal",
              size: 1200,
              innerProps: {
                type: "DATA",
              },
            })
          }
          rightSection={<IconDeviceDesktop size={20} />}
        >
          Multicaixa
        </Button>
      </div>
    </div>
  );
}
