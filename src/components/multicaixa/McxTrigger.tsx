"use client";

import { useMcxTrigger } from "@/hooks/useMcxTrigger";

import McxToolbar from "./McxToolbar";
import { Modal, Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default function McxTrigger() {
  const { open, closeHandler, opened, McxView } = useMcxTrigger();

  return (
    <>
      <Button onClick={open} rightSection={<IconDeviceDesktop size={20} />}>
        Multicaixa
      </Button>
      <Modal
        opened={opened}
        centered
        withCloseButton={false}
        size={1200}
        onClose={closeHandler}
      >
        <div className="bg-brand-500 h-[820px]">
          <div className="h-full flex flex-col">
            <McxToolbar onClose={closeHandler} />
            <McxView />
          </div>
        </div>
      </Modal>
    </>
  );
}
