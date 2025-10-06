"use client";

import { useResetMcx, useCloseMcxModal } from "@/hooks/reset-mcx";

import { Button } from "@mantine/core";
import { IconX, IconRestore } from "@tabler/icons-react";

export default function McxToolbar() {
  const reset = useResetMcx();
  const closeModal = useCloseMcxModal();

  return (
    <div className="flex justify-end p-2">
      <div className="flex gap-2">
        <Button
          size="compact-sm"
          color="orange"
          leftSection={<IconRestore size={16} />}
          onClick={reset}
          className="focus:outline-orange-500"
        >
          Reset
        </Button>
        <Button
          size="compact-sm"
          color="red"
          leftSection={<IconX size={16} />}
          onClick={closeModal}
          className="focus:outline-red-500"
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
