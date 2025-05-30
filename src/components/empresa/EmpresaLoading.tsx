import { Card, Skeleton } from "@mantine/core";

export default function EmpresaLoading() {
  return (
    <Card withBorder className="h-32 gap-4  justify-center mb-8">
      <Skeleton height={32} radius="sm" />
      <Skeleton height={32} radius="sm" />
    </Card>
  );
}
