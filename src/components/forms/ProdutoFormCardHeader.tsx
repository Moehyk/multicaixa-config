"use client";

import { openContextModal } from "@mantine/modals";

import FormHeaderTitle from "./FormHeaderTitle";
import { Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default function ProdutoFormCardHeader(props: {
  header: string;
  subheader: string;
}) {
  return (
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
  );
}
