import { Card, Divider, Button } from "@mantine/core";

export default function FormHeaderTitle({
  header,
  subheader,
}: {
  header: string;
  subheader: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl font-semibold">{header}</span>
      <Divider orientation="vertical" />
      <span className="text-lg font-medium">{subheader}</span>
    </div>
  );
}
