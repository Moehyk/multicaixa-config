"use client";

import { useRouter, useParams } from "next/navigation";

import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function McxToolbar() {
  const { push } = useRouter();
  const params = useParams();

  return (
    <div className="flex justify-end p-2">
      <div className="flex gap-2">
        {Object.keys(params).length > 0 && (
          <Button
            size="compact-sm"
            color="cyan"
            leftSection={<IconX size={16} />}
            onClick={() => push("/multicaixa/mcx")}
          >
            Reset
          </Button>
        )}
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
