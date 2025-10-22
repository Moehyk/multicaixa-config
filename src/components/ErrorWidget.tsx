"use client";

import { Button, ThemeIcon, Paper } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

import type { ErrorBoundaryProps } from "@/types";

export default function ErroWidget({ error, reset }: ErrorBoundaryProps) {
  return (
    <Paper w="50%" p={16} withBorder className="mb-32 items-center self-center">
      <div className="flex items-center gap-4">
        <ThemeIcon variant="transparent" color="red" size={48}>
          <IconExclamationCircle size={48} />
        </ThemeIcon>
        <h2 className="font-medium text-lg">{error.message}</h2>
      </div>
      <Button variant="default" className="w-max mt-8" onClick={reset}>
        Voltar
      </Button>
    </Paper>
  );
}
