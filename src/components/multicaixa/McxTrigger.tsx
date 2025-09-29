"use client";

import { openContextModal } from "@mantine/modals";

import { Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default function McxTrigger() {
  return (
    <>
      <Button
        onClick={() =>
          openContextModal({
            modal: "mcx-modal",
            size: 1200,
            innerProps: {},
          })
        }
        rightSection={<IconDeviceDesktop size={20} />}
      >
        Multicaixa
      </Button>
    </>
  );
}
