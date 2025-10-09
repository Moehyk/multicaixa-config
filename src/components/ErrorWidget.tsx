"use client";

import { useErrorWidget } from "@/hooks/error-widget";

import { Button, ThemeIcon, Paper } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function ErroWidget({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const back = useErrorWidget(error);

  return (
    <Paper w="50%" p={32} withBorder className="mb-32 items-center self-center">
      <ThemeIcon variant="transparent" color="red" size={64}>
        <IconExclamationCircle size={64} />
      </ThemeIcon>
      <h2 className="font-semibold text-lg">Aconteceu algo de errado!</h2>
      <Button variant="default" className="w-max mt-8" onClick={back}>
        Voltar
      </Button>
    </Paper>
  );
}
