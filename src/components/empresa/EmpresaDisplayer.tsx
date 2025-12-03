"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { empresaDisplayerRefStore } from "@/context/empresa-displayer-ref";
import { modals } from "@mantine/modals";
import { openMcxDataModal } from "@/utils";

import Link from "next/link";
import { ServicoModalForm } from "@/components/servico";
import { Button, Paper } from "@mantine/core";
import { IconEdit, IconDeviceDesktop } from "@tabler/icons-react";

import { EmpresaData } from "@/types";

function OpenMcxDataModal({
  data,
  flex,
}: {
  data: EmpresaData;
  flex?: number;
}) {
  return (
    <Button
      flex={flex}
      variant="default"
      onClick={() => openMcxDataModal(data)}
      rightSection={<IconDeviceDesktop size={20} />}
    >
      Ver Multicaixa
    </Button>
  );
}

function DisplayerActions({ data }: { data: EmpresaData }) {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/multicaixa" ? (
        <div className="flex gap-2 w-1/2">
          <OpenMcxDataModal data={data} flex={1} />
          <Button
            component={Link}
            href="/multicaixa/empresa"
            variant="default"
            rightSection={<IconEdit size={20} />}
            flex={1}
          >
            Editar Empresa
          </Button>

          <Button
            flex={1}
            onClick={() =>
              modals.open({
                title: "Criar Novo Serviço",
                children: <ServicoModalForm empresaId={data.id} />,
              })
            }
          >
            Novo Serviço
          </Button>
        </div>
      ) : (
        <OpenMcxDataModal data={data} />
      )}
    </>
  );
}

export default function EmpresaDisplayer({ data }: { data: EmpresaData }) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    empresaDisplayerRefStore.setState({ ref: sentinelRef });
  }, [sentinelRef]);

  return (
    <Paper
      withBorder
      p="lg"
      mb={32}
      ref={sentinelRef}
      className="flex items-center justify-between"
    >
      <h2 className="text-2xl font-semibold max-w-100">{data.nome}</h2>
      <DisplayerActions data={data} />
    </Paper>
  );
}
