"use client";

import { openContextModal } from "@mantine/modals";

import { Card, Divider, Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default function FormCard({
  children,
  header,
  subheader,
}: {
  children: React.ReactNode;
  header: string;
  subheader: string;
}) {
  return (
    <Card withBorder p={32}>
      <div className="mb-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">{header}</span>
          <Divider orientation="vertical" />
          <span className="text-lg font-medium">{subheader}</span>
        </div>
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
