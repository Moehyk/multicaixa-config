"use client";

import { useViewsStore } from "@/context/mcx";

import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function McxToolbar({ close }: { close?: () => void }) {
  const { setView } = useViewsStore();

  return (
    <div className="flex justify-end p-2">
      <div className="flex gap-2">
        <Button
          size="compact-sm"
          color="cyan"
          leftSection={<IconX size={16} />}
          onClick={() => setView("empresa")}
        >
          Reset
        </Button>
        <Button
          size="compact-sm"
          color="orange"
          leftSection={<IconX size={16} />}
          onClick={close}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
