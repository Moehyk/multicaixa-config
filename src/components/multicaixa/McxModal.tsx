"use client";

import { useViewsStore } from "@/context/mcx";

import McxToolbar from "./McxToolbar";

import type { McxAppType } from "@/types";
import type { ContextModalProps } from "@mantine/modals";

function McxApp() {
  const { McxView } = useViewsStore();
  return <McxView />;
}

function McxAppPreview() {
  return <div>Preview</div>;
}

const renderApp = (type: McxAppType) => {
  switch (type) {
    case "APP": {
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
    <div className="bg-brand-700 h-[820px]">
      <div className="h-full flex flex-col">
        <McxToolbar />
        {renderApp(type)}
      </div>
    </div>
  );
}
