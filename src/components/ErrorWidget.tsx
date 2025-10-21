import Link from "next/link";

import { Button, ThemeIcon, Paper } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function ErroWidget({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <Paper w="50%" p={32} withBorder className="mb-32 items-center self-center">
      <ThemeIcon variant="transparent" color="red" size={64}>
        <IconExclamationCircle size={64} />
      </ThemeIcon>
      <h2 className="font-semibold text-lg">{message}</h2>
      <Button
        component={Link}
        href="/multicaixa"
        variant="default"
        className="w-max mt-8"
      >
        Voltar
      </Button>
    </Paper>
  );
}
