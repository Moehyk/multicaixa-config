import { Card } from "@mantine/core";

export default function EmpresaCard({ children }: React.PropsWithChildren) {
  return (
    <Card withBorder px={8} py={8} mb={48} radius="xl">
      {children}
    </Card>
  );
}
