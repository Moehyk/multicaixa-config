"use client";

import { mcxDataStore } from "@/context/mcx";
import { openContextModal } from "@mantine/modals";

import Link from "next/link";
import { ActionIcon, Tooltip, Button } from "@mantine/core";
import { IconEdit, IconDeviceDesktop } from "@tabler/icons-react";

function Toolbar({ children }: React.PropsWithChildren) {
  return (
    <div className="fixed left-0 right-0 top-24 z-50 h-16 flex items-center bg-brand-800 ">
      <div className="container w-full flex items-center justify-between">
        <div className="w-full flex items-center justify-between">
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
      <h2 className="text-lg text-white font-bold">{nome}</h2>
      <Tooltip label="Editar Empresa">
        <ActionIcon
          component={Link}
          href="/multicaixa/empresa"
          variant="transparent"
          color="white"
        >
          <IconEdit size={20} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

function McxModalSection() {
  return (
    <>
      <Button
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
