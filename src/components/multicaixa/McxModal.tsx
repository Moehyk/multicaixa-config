"use client";

import { useViewsStore } from "@/context/mcx";

import McxToolbar from "./McxToolbar";

export default function McxModal() {
  const { McxView } = useViewsStore();

  return (
    <div className="bg-brand-500 h-[820px]">
      <div className="h-full flex flex-col">
        <McxToolbar />
        <McxView />
      </div>
    </div>
  );
}
