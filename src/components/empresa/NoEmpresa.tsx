"use client";

import { modals } from "@mantine/modals";

import CriarEmpresaModal from "./CriarEmpresaModal";
import { Paper, Button } from "@mantine/core";
import { IconHomePlus } from "@tabler/icons-react";

export default function NoEmpresa() {
  return (
    <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 z-50">
      <Paper
        withBorder
        w={"max-content"}
        p={40}
        className="m-auto content-center"
      >
        <div className="flex items-center gap-16">
          <div className="flex items-center">
            <div className="bg-brand-accent w-1 h-16 mr-4" />
            <span className="font-medium">
              <p className="text-2xl pb-2">
                Bem vindo ao&nbsp;
                <span className="font-bold text-[var(--mantine-color-brand-text)]">
                  McxConfig
                </span>
              </p>
              <p>Para começar deve criar a sua empresa</p>
            </span>
          </div>
          <Button
            onClick={() =>
              modals.open({
                title: "Criar Empresa",
                size: "xl",
                children: <CriarEmpresaModal />,
                withCloseButton: true,
              })
            }
            leftSection={<IconHomePlus size={20} />}
          >
            Criar Empresa
          </Button>
        </div>
      </Paper>
    </div>
  );
}
