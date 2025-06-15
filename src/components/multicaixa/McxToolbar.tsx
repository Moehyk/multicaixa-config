"use client";

import { useRouter, useParams } from "next/navigation";

import { modals } from "@mantine/modals";
import { useMulticaixaController } from "@/context/multicaixa-controller";

import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function McxToolbar({ title }: { title: string }) {
  const { push } = useRouter();

  return (
    <div className="flex justify-end p-2">
      <div className="flex gap-2">
        <Button
          size="compact-sm"
          color="cyan"
          leftSection={<IconX size={16} />}
        >
          Reset
        </Button>
        <Button
          size="compact-sm"
          color="orange"
          leftSection={<IconX size={16} />}
          onClick={() => push("/multicaixa")}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
