"use client";

import { Button, ThemeIcon, Paper } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

import type { ErrorBoundaryProps } from "@/types";

export default function ErroWidget({ error, reset }: ErrorBoundaryProps) {
  return (
    <Paper w="50%" p={32} withBorder className="mb-32 items-center self-center">
      <ThemeIcon variant="transparent" color="red" size={64}>
        <IconExclamationCircle size={64} />
      </ThemeIcon>
      <h2 className="font-semibold text-lg">{error.message}</h2>
      <Button variant="default" className="w-max mt-8" onClick={reset}>
        Voltar
      </Button>
    </Paper>
  );
}
