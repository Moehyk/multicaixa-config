"use client";

import { mcxDataStore } from "@/context/mcx";
import { openContextModal } from "@mantine/modals";

import Link from "next/link";
import { ActionIcon, Tooltip, Button, Paper } from "@mantine/core";
import { IconEdit, IconDeviceDesktop } from "@tabler/icons-react";
import { size } from "zod/v4";

function Toolbar({ children }: React.PropsWithChildren) {
  return (
    <div className="fixed left-0 right-0 top-24 z-50">
      <div className="w-full bg-body/50 backdrop-blur-md drop-shadow-md py-4">
        <div className="container flex items-center justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}

function EmpresaEditSection() {
  const { nome } = mcxDataStore();

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-semibold">{nome}</h2>
      <Tooltip label="Editar Empresa">
        <ActionIcon
          component={Link}
          href="/multicaixa/empresa"
          variant="transparent"
          color="black"
        >
          <IconEdit size={24} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

function McxModalSection() {
  return (
    <>
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
    </>
  );
}

export default function EmpresaToolbar() {
  return (
    <Toolbar>
      <EmpresaEditSection />
      <McxModalSection />
    </Toolbar>
  );
}
