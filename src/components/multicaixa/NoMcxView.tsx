import { Paper } from "@mantine/core";
import McxContentWrapper from "./McxContentWrapper";

export default function NoMcxView({ text }: { text: string }) {
  return (
    <McxContentWrapper>
      <Paper p="xl" className="mx-auto mb-80 text-center shadow-none">
        <p className="text-xl font-medium">{text}</p>
      </Paper>
    </McxContentWrapper>
  );
}
