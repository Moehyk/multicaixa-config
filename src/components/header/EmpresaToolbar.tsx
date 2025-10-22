"use client";

import { useEmpresaDisplayer, useRenderWithAnimation } from "@/hooks";

import { LogoLink } from "@/components";
import Link from "next/link";

import { ActionIcon, Divider, Tooltip } from "@mantine/core";
import { IconEdit, IconDeviceDesktop } from "@tabler/icons-react";

import type { EmpresaData } from "@/types";

export default function EmpresaToolbar({
  isVisible,
  empresa,
}: {
  isVisible: boolean;
  empresa: EmpresaData;
}) {
  const { openModal } = useEmpresaDisplayer(empresa);

  const shouldRender = useRenderWithAnimation(isVisible);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`flex items-center ${
        shouldRender ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <LogoLink hasType={false} />
      <Divider orientation="vertical" mx={12} my={6} />
      <h2 className="text-xl font-semibold">{empresa.nome}</h2>
      <div className="flex gap-2 pl-6">
        <Tooltip label="Editar Empresa" position="top">
          <ActionIcon
            variant="default"
            radius={999}
            component={Link}
            href="/multicaixa/empresa"
          >
            <IconEdit size={20} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Multicaixa" position="top">
          <ActionIcon
            variant="default"
            color="red"
            radius={999}
            onClick={openModal}
          >
            <IconDeviceDesktop size={20} />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
}
