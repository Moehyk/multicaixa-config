"use client";

import { Card, Skeleton } from "@mantine/core";

export default function GridLoading({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <Card key={`row-${i}`} withBorder>
          <Skeleton height={34} radius="xl" />
        </Card>
      ))}
    </>
  );
}
