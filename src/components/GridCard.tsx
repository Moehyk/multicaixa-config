import { Card } from "@mantine/core";

export default function GridCard({ children }: React.PropsWithChildren) {
  return <Card withBorder>{children}</Card>;
}
