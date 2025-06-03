"use client";

import { useMotionIcon } from "@/hooks";

import { Card, Button, Collapse, Tooltip, ActionIcon } from "@mantine/core";
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
          <ActionIcon variant="default" onClick={motionIcon}>
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
          <Button.Group>
            <Tooltip label="Criar Produto" position="top">
              <Button size="xs" variant="default" radius="xs">
                <IconPlus size={16} />
              </Button>
            </Tooltip>
            <Tooltip label="Editar Serviço" position="top">
              <Button size="xs" variant="default" radius="xs">
                <IconEdit size={16} />
              </Button>
            </Tooltip>
            <Tooltip label="Apagar Serviço" position="top">
              <Button size="xs" variant="default" radius="xs">
                <IconTrash size={16} />
              </Button>
            </Tooltip>
          </Button.Group>
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
