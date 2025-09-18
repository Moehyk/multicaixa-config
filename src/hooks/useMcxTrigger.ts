import { useDisclosure } from "@mantine/hooks";
import { useViewsStore } from "@/context/mcx";
import { useResetMcx } from "./useResetMcx";

export const useMcxTrigger = () => {
  const reset = useResetMcx();
  const [opened, { open, close }] = useDisclosure(false);
  const { McxView } = useViewsStore();

  const closeHandler = () => {
    reset();
    close();
  };

  return { open, closeHandler, opened, McxView };
};
