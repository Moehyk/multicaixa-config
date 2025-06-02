import { Card, LoadingOverlay } from "@mantine/core";

export default function GlobalLoader() {
  return (
    <div className="w-full grid justify-center mt-16">
      <Card
        shadow="xl"
        withBorder
        styles={{
          root: {
            borderRadius: 900,
          },
        }}
        w={64}
        h={64}
      >
        <LoadingOverlay visible />
      </Card>
    </div>
  );
}
