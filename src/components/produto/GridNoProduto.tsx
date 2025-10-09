import Link from "next/link";
import { Button, Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function GridNoProduto({ id }: { id: string }) {
  const icon = <IconExclamationCircle size={28} stroke={1.75} />;

  return (
    <Alert
      variant="default"
      title="Este serviço não possui produtos"
      icon={icon}
      w="100%"
      styles={{
        root: {
          backgroundColor: "var(--mantine-paper-body)",
        },
        wrapper: {
          alignItems: "center",
          gap: "0.5rem",
        },
        body: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        icon: {
          width: "2rem",
          height: "2rem",
          margin: 0,
          justifyContent: "center",
        },
        title: {
          fontWeight: 600,
        },
      }}
    >
      <Button
        component={Link}
        href={`multicaixa/servico/${id}/criar-produto`}
        variant="default"
        size="xs"
      >
        Criar Produto
      </Button>
    </Alert>
  );
}
