"use client";

import { deleteServico } from "@/server/services";
import { useMotionIcon } from "@/hooks";
import { modals } from "@mantine/modals";

import Link from "next/link";
import { GridItem } from "@/components";
import ServicoModalForm from "./ServicoModalForm";
import { Card, Collapse, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash, IconEdit, IconPlus } from "@tabler/icons-react";

import type { Servico } from "@prisma/client";
import type { ServicoWithProdutos } from "@/types";

function ServicoItemTitle({
  title,
  motion,
}: {
  title: string;
  motion: {
    MotionIcon: React.ComponentType<any>;
    openedIcon: boolean;
    motionIcon: () => void;
  };
}) {
  return (
    <>
      <ActionIcon variant="default" onClick={motion.motionIcon} size="lg">
        <motion.MotionIcon
          size={16}
          variants={{ open: { rotate: -180 }, closed: { rotate: 0 } }}
          animate={motion.openedIcon ? "open" : "closed"}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </ActionIcon>
      <h2 className="font-semibold text-xl">{title}</h2>
    </>
  );
}

function ServicoItemActions({ id, servico }: { id: string; servico: Servico }) {
  const handleEditServico = () =>
    modals.open({
      title: "Editar Serviço",
      children: <ServicoModalForm empresaId={id} servico={servico} />,
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
    <>
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
        <ActionIcon size="lg" variant="default" onClick={handleDeleteServico}>
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  );
}

function ServicoItemCollapse({
  children,
  opened,
}: {
  children?: React.ReactNode;
  opened: boolean;
}) {
  return (
    <Collapse
      in={opened}
      animateOpacity={false}
      transitionTimingFunction="linear"
    >
      <Card
        withBorder
        className="gap-4 mt-8"
        styles={{
          root: {
            backgroundColor: "var(--mantine-body-accent)",
          },
        }}
      >
        {children}
      </Card>
    </Collapse>
  );
}

export default function ServicoItem({
  children,
  servico,
}: {
  children?: React.ReactNode;
  servico: ServicoWithProdutos;
}) {
  const { MotionIcon, openedIcon, opened, motionIcon } = useMotionIcon();

  return (
    <GridItem
      titleSection={
        <ServicoItemTitle
          title={servico.desig_sistema}
          motion={{
            MotionIcon,
            openedIcon,
            motionIcon,
          }}
        />
      }
      actionsSection={
        <ServicoItemActions id={servico.empresaId} servico={servico} />
      }
      collapseSection={
        <ServicoItemCollapse opened={opened}>{children}</ServicoItemCollapse>
      }
    />
  );
}
