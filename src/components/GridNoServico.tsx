import { Card, Button, Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function GridNoServico() {
  const icon = <IconExclamationCircle />;

  return (
    <Alert
      variant="default"
      color="brand"
      title="Sem serviços para apresentar"
      icon={icon}
      className="self-center"
      w="100%"
    />
  );
}
