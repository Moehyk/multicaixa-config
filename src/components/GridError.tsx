import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function GridError({
  message,
}: {
  message: string | undefined;
}) {
  const icon = <IconAlertTriangle />;

  return (
    <Alert
      variant="light"
      color="red"
      title={message}
      icon={icon}
      w="100%"
      styles={{
        root: {
          border: "1px solid var(--mantine-color-red-light-color)",
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
          fontWeight: 500,
          fontSize: "1rem",
        },
      }}
    />
  );
}
