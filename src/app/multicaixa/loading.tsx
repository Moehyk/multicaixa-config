"use client";

import { LoadingOverlay, Portal, Loader } from "@mantine/core";

export default function MulticaixaPageLoading() {
  return (
    <Portal>
      <LoadingOverlay
        visible
        overlayProps={{
          blur: 5,
          styles: {
            root: {
              backgroundColor: "rgba(43,104,236, 0.1)",
            },
          },
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
