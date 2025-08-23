import { modals } from "@mantine/modals";

import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function McxCloseBtn() {
  return (
    <div className="flex justify-end p-2">
      <ActionIcon color="orange" onClick={() => modals.closeAll()}>
        <IconX size={20} />
      </ActionIcon>
    </div>
  );
}
