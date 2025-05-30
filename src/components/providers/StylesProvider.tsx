"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme, resolver } from "@/mantine";

export default function StylesProvider({ children }: React.PropsWithChildren) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="auto"
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
}
