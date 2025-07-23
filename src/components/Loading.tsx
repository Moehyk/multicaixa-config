import { LoadingOverlay, Portal, Loader } from "@mantine/core";

function BaseLoading({
  styles,
  loaderColor,
}: {
  styles?: string;
  loaderColor?: string;
}) {
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
          <div className={styles}>
            <Loader size="lg" type="bars" color={loaderColor} />
          </div>
        ),
      }}
    />
  );
}

export default function Loading({ origin }: { origin: "GLOBAL" | "MODAL" }) {
  if (origin === "MODAL") {
    console.log("global");
    return (
      <BaseLoading
        styles="bg-body rounded-md p-4 drop-shadow-xl"
        loaderColor="orange"
      />
    );
  }

  return (
    <Portal>
      <BaseLoading styles="bg-body rounded-md p-4 drop-shadow-xl border border-border/50" />
    </Portal>
  );
}
