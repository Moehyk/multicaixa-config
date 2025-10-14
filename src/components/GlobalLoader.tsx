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
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            },
          },
        }}
        loaderProps={{
          children: (
            <div className="bg-paper rounded-full p-4 drop-shadow-xl border border-border flex items-center justify-center">
              <Loader size="lg" />
            </div>
          ),
        }}
      />
    </Portal>
  );
}
