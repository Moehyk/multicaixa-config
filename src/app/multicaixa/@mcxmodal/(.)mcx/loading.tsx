"use client";

import { LoadingOverlay, Loader } from "@mantine/core";

export default function McxLoadingIntercepted() {
  return (
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
          <div className="bg-body rounded-md p-4 drop-shadow-xl">
            <Loader size="lg" type="bars" color="orange" />
          </div>
        ),
      }}
    />
  );
}
