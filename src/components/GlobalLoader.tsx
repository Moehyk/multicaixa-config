"use client";

import { LoadingOverlay, Portal, Loader } from "@mantine/core";

export default function GlobalLoader() {
  return (
    <Portal>
      <LoadingOverlay
        visible
        overlayProps={{
          blur: 2,
        }}
        loaderProps={{
          children: (
            <div className="bg-body rounded-md p-4 drop-shadow-xl border border-border/50">
              <Loader size="lg" type="bars" />
            </div>
          ),
        }}
      />
    </Portal>
  );
}
