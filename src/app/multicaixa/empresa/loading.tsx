"use client";

import { Card, Skeleton } from "@mantine/core";

export default function CriarEmpresaLoading() {
  return (
    <Card withBorder p={32} className="h-[648px] gap-4">
      <Skeleton height="25%" radius="sm" />
      <Skeleton height="25%" radius="sm" />
      <Skeleton height="25%" radius="sm" />
      <Skeleton height="25%" radius="sm" />
      <Skeleton height="25%" radius="sm" />
    </Card>
  );
}
