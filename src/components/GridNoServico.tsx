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
      w="100%"
      styles={{
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
          fontWeight: 500,
          fontSize: "1rem",
        },
      }}
    />
  );
}
