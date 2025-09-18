"use client";

import { useResetMcx } from "@/hooks/useResetMcx";

import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function McxToolbar({ onClose }: { onClose: () => void }) {
  const reset = useResetMcx();

  return (
    <div className="flex justify-end p-2">
      <div className="flex gap-2">
        <Button
          size="compact-sm"
          color="cyan"
          leftSection={<IconX size={16} />}
          onClick={reset}
        >
          Reset
        </Button>
        <Button
          size="compact-sm"
          color="orange"
          leftSection={<IconX size={16} />}
          onClick={onClose}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
