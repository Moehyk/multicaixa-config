"use client";

import { useViewsStore } from "@/context/mcx";
import { useResetMcx } from "@/hooks/useResetMcx";

import McxToolbar from "./McxToolbar";

import type { ContextModalProps } from "@mantine/modals";

export default function McxModal({ context, id }: ContextModalProps) {
  const { McxView } = useViewsStore();
  const reset = useResetMcx();

  const closeHandler = () => {
    reset();
    context.closeContextModal(id);
  };

  return (
    <div className="bg-brand-500 h-[820px]">
      <div className="h-full flex flex-col">
        <McxToolbar onClose={closeHandler} />
        <McxView />
      </div>
    </div>
  );
}
