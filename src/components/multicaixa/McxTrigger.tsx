"use client";

import { useDisclosure } from "@mantine/hooks";
import { useViewStore } from "@/context/mcx";

import McxToolbar from "./McxToolbar";
import { Modal, Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default function McxTrigger() {
  const [opened, { open, close }] = useDisclosure(false);
  const { McxView } = useViewStore();

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
        onClose={() => {}}
      >
        <div className="bg-brand-500 h-[820px]">
          <div className="h-full flex flex-col">
            <McxToolbar close={close} />
            <McxView />
          </div>
        </div>
      </Modal>
    </>
  );
}
