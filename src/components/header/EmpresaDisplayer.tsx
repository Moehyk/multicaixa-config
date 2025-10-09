"use client";

import { RefObject } from "react";
import { useEmpresaDisplayer } from "@/hooks";

import Link from "next/link";
import { Button } from "@mantine/core";
import { IconEdit, IconDeviceDesktop } from "@tabler/icons-react";

export default function EmpresaDisplayer({
  ref,
}: {
  ref: RefObject<HTMLElement | null>;
}) {
  const { nome, openModal } = useEmpresaDisplayer();

  return (
    <section ref={ref} className="pb-16">
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
          onClick={openModal}
          rightSection={<IconDeviceDesktop size={20} />}
        >
          Multicaixa
        </Button>
      </div>
    </section>
  );
}
