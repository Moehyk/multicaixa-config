"use client";

import { Skeleton, Paper } from "@mantine/core";
import { GridHeader } from "@/components";

function LoadingItem() {
  return (
    <Paper withBorder p={8}>
      <Skeleton height={64} radius="md" />
    </Paper>
  );
}

export default function ServicosLoading() {
  return (
    <>
      <GridHeader />
      <div className="flex flex-col gap-4">
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
      </div>
    </>
  );
}
