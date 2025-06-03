"use client";

import { useMotionIcon } from "@/hooks";

import { Card, Collapse, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash, IconEdit, IconPlus } from "@tabler/icons-react";

export default function GridServico({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  const { MotionIcon, openedIcon, opened, motionIcon } = useMotionIcon();

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
          <h2 className="font-semibold text-xl">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <ActionIcon.Group>
            <Tooltip label="Criar Produto" position="top">
              <ActionIcon size="lg" variant="default">
                <IconPlus size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Editar Serviço" position="top">
              <ActionIcon size="lg" variant="default">
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Apagar Serviço" position="top">
              <ActionIcon size="lg" variant="default">
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </ActionIcon.Group>
        </div>
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
