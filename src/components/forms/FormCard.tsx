import { Card, Divider } from "@mantine/core";

export default function FormCard({
  children,
  header,
  subheader,
}: {
  children: React.ReactNode;
  header: string;
  subheader: string;
}) {
  return (
    <Card withBorder p={32}>
      <div className="mb-10 flex items-center gap-4">
        <span className="text-2xl font-semibold">{header}</span>
        <Divider orientation="vertical" />
        <span className="text-lg font-medium">{subheader}</span>
      </div>
      {children}
    </Card>
  );
}
