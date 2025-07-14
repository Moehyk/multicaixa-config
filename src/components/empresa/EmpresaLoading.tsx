import EmpresaCard from "./EmpresaCard";
import { Card, Skeleton } from "@mantine/core";

export default function EmpresaLoading() {
  return (
    <EmpresaCard>
      <Skeleton height={36} radius="xl" />
    </EmpresaCard>
  );
}
