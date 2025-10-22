"use client";

import { useEffect, useRef } from "react";
import { useEmpresaDisplayer } from "@/hooks";
import { empresaDisplayerRefStore } from "@/context/empresa-displayer-ref";

import Link from "next/link";
import { Button } from "@mantine/core";
import { IconEdit, IconDeviceDesktop } from "@tabler/icons-react";

import classes from "./buttons.module.css";
import { EmpresaData } from "@/types";

export default function EmpresaDisplayer({ data }: { data: EmpresaData }) {
  const { openModal } = useEmpresaDisplayer(data);
  const sentinelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    empresaDisplayerRefStore.setState({ ref: sentinelRef });
  }, [sentinelRef]);

  return (
    <section ref={sentinelRef} className="pb-16">
      <h2 className="text-4xl font-semibold mb-4">{data.nome}</h2>
      <div className="flex gap-2 max-w-88">
        <Button
          component={Link}
          href="/multicaixa/empresa"
          variant="default"
          rightSection={<IconEdit size={20} />}
          flex={1}
          classNames={{
            root: classes.btn,
          }}
        >
          Editar Empresa
        </Button>
        <Button
          variant="default"
          onClick={openModal}
          rightSection={<IconDeviceDesktop size={20} />}
          flex={1}
          classNames={{
            root: classes.btn,
          }}
        >
          Ver Multicaixa
        </Button>
      </div>
    </section>
  );
}
