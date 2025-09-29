"use client";

import { openContextModal } from "@mantine/modals";

import FormHeaderTitle from "./FormHeaderTitle";
import { Card, Divider, Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default function FormCard({
  children,
  ...props
}: {
  children: React.ReactNode;
  header: string;
  subheader: string;
}) {
  return (
    <Card withBorder p={32}>
      <div className="mb-16 flex items-center justify-between">
        <FormHeaderTitle {...props} />
        <Button
          variant="outline"
          rightSection={<IconDeviceDesktop size={20} />}
          onClick={() =>
            openContextModal({
              modal: "mcx-modal",
              size: 1200,
              innerProps: {
                type: "PREVIEW",
              },
            })
          }
        >
          Visualizar
        </Button>
      </div>
      {children}
    </Card>
  );
}
