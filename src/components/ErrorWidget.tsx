"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, Button, ThemeIcon } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function ErroWidget({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { push } = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card w="50%" p={32} withBorder className="mb-32 items-center self-center">
      <ThemeIcon variant="transparent" color="red" size={64}>
        <IconExclamationCircle size={64} />
      </ThemeIcon>
      <h2 className="font-semibold text-lg">Aconteceu algo de errado!</h2>
      <Button
        variant="default"
        className="w-max mt-8"
        onClick={() => push("/multicaixa")}
      >
        Voltar
      </Button>
    </Card>
  );
}
