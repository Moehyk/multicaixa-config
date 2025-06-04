"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme, resolver } from "@/mantine";
import { ModalsProvider } from "@mantine/modals";
import { modalsOptions } from "@/mantine/modals";

export default function StylesProvider({ children }: React.PropsWithChildren) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="auto"
    >
      <ModalsProvider {...modalsOptions}>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
