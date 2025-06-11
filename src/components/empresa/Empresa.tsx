import { Suspense } from "react";
import { Grid, GridHeader, GridLoading, ServicoLoader } from "@/components";

import type { Empresa } from "@prisma/client";

export default function Empresa({ id }: Empresa) {
  return (
    <>
      <GridHeader empresaId={id} />
      <Grid>
        <Suspense fallback={<GridLoading rows={4} />}>
          <ServicoLoader id={id} />
        </Suspense>
      </Grid>
    </>
  );
}
