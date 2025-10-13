"use client";

import { useViewsStore, usePreViewStore } from "@/context/mcx";

import McxToolbar from "./McxToolbar";

import type { McxAppType } from "@/types";
import type { ContextModalProps } from "@mantine/modals";

function McxApp() {
  const { McxView } = useViewsStore();
  return <McxView />;
}

function McxAppPreview() {
  const { McxPreviewView } = usePreViewStore();
  return <McxPreviewView />;
}

const renderApp = (type: McxAppType) => {
  switch (type) {
    case "DATA": {
      return <McxApp />;
    }
    case "PREVIEW": {
      return <McxAppPreview />;
    }
  }
};

export default function McxModal({
  innerProps: { type },
}: ContextModalProps<{
  type: McxAppType;
}>) {
  return (
    <div className="bg-mcx-bg h-[820px]">
      <div className="h-full flex flex-col">
        <McxToolbar />
        {renderApp(type)}
      </div>
    </div>
  );
}
