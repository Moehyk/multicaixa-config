import { useNoMcxView } from "@/hooks/no-mcx-view";

import McxContentWrapper from "./McxContentWrapper";
import { Paper, Button } from "@mantine/core";

import type { Views } from "@/types";

export default function NoMcxView({ view }: { view: Views }) {
  const [text, back] = useNoMcxView(view);

  return (
    <McxContentWrapper>
      <Paper p="xl" className="mx-auto mb-80 text-center shadow-none">
        <p className="text-xl font-medium mb-8">{text}</p>
        <Button color="orange" onClick={back}>
          Voltar
        </Button>
      </Paper>
    </McxContentWrapper>
  );
}
