import { Paper } from "@mantine/core";

export default function NoMcxView({ text }: { text: string }) {
  return (
    <Paper p="xl" className="mx-auto mb-80 text-center shadow-none">
      <p className="text-xl font-medium">{text}</p>
    </Paper>
  );
}
