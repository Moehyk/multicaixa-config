"use client";

import { useViewsStore, usePreViewStore, McxDataProvider } from "@/context/mcx";

import McxToolbar from "./McxToolbar";

import type { McxApp, EmpresaData } from "@/types";
import type { ContextModalProps } from "@mantine/modals";

function McxApp({ data }: { data: EmpresaData }) {
  const { McxView } = useViewsStore();

  const servicos = data.servicos;
  const produtos = data.servicos.flatMap((s) => s.produtos);

  return (
    <McxDataProvider
      empresa={{ ...data }}
      servicos={servicos}
      produtos={produtos}
    >
      <McxView />
    </McxDataProvider>
  );
}

function McxAppPreview() {
  const { McxPreviewView } = usePreViewStore();
  return (
    <McxDataProvider empresa={null} servicos={[]} produtos={[]}>
      <McxPreviewView />
    </McxDataProvider>
  );
}

const renderApp = (app: McxApp) => {
  switch (app.type) {
    case "DATA": {
      return <McxApp data={app.data} />;
    }
    case "PREVIEW": {
      return <McxAppPreview />;
    }
  }
};

export default function McxModal({
  innerProps: { app },
}: ContextModalProps<{
  app: McxApp;
}>) {
  return (
    <div className="bg-mcx-bg h-[820px]">
      <div className="h-full flex flex-col">
        <McxToolbar />
        {renderApp(app)}
      </div>
    </div>
  );
}
