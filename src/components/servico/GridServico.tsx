"use client";

import Link from "next/link";
import { deleteServico } from "@/server/services";
import { useMotionIcon } from "@/hooks";
import { modals } from "@mantine/modals";

import { ServicoModalForm } from "@/components/servico";
import { Card, Collapse, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash, IconEdit, IconPlus } from "@tabler/icons-react";

import type { Servico } from "@prisma/client";

export default function GridServico({
  children,
  servico: { empresaId, ...servico },
}: {
  children?: React.ReactNode;
  servico: Servico;
}) {
  const { MotionIcon, openedIcon, opened, motionIcon } = useMotionIcon();

  const handleEditServico = () =>
    modals.open({
      title: "Editar Serviço",
      children: <ServicoModalForm empresaId={empresaId} servico={servico} />,
    });

  const handleDeleteServico = () =>
    modals.openContextModal({
      title: "Apagar Serviço",
      modal: "confirm-delete",
      innerProps: {
        model: "servico",
        dataId: servico.id,
        onDelete: deleteServico,
      },
    });

  return (
    <Card withBorder className="justify-center ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ActionIcon variant="default" onClick={motionIcon} size="lg">
            <MotionIcon
              size={16}
              variants={{ open: { rotate: -180 }, closed: { rotate: 0 } }}
              animate={openedIcon ? "open" : "closed"}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          </ActionIcon>
          <h2 className="font-semibold text-xl">{servico.desig_sistema}</h2>
        </div>
        <ActionIcon.Group>
          <Tooltip label="Criar Produto" position="top">
            <ActionIcon
              component={Link}
              href={`/multicaixa/servico/${servico.id}/criar-produto`}
              size="lg"
              variant="default"
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Editar Serviço" position="top">
            <ActionIcon size="lg" variant="default" onClick={handleEditServico}>
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Apagar Serviço" position="top">
            <ActionIcon
              size="lg"
              variant="default"
              onClick={handleDeleteServico}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </ActionIcon.Group>
      </div>
      <Collapse
        in={opened}
        animateOpacity={false}
        transitionTimingFunction="linear"
      >
        <Card withBorder bg="var(--mantine-color-body)" className="gap-2 mt-8">
          {children}
        </Card>
      </Collapse>
    </Card>
  );
}
