import { Suspense } from "react";
import { Grid, GridHeader, ServicoLoader } from "@/components";

import type { Empresa } from "@prisma/client";

export default function Empresa({ id }: Empresa) {
  return (
    <>
      <GridHeader empresaId={id} />
      <Grid>
        <Suspense fallback={<div>Loading...</div>}>
          <ServicoLoader id={id} />
        </Suspense>
      </Grid>
    </>
  );
}
