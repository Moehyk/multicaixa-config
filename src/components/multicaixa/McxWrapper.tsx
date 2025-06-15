"use client";

import { useRouter, usePathname } from "next/navigation";
import { Modal } from "@mantine/core";
import path from "path";

export default function McxWrapper({ children }: React.PropsWithChildren) {
  const { push } = useRouter();

  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <Modal
      opened={pathname.startsWith("/multicaixa/mcx")}
      centered
      withCloseButton={false}
      size={1200}
      onClose={() => {}}
    >
      <div className="bg-brand-500 h-[820px]">
        <div className="h-full flex flex-col">{children}</div>
      </div>
    </Modal>
  );
}
