import { Suspense } from "react";
import { Grid, GridHeader, GridLoading, GridServico } from "@/components";

import type { Empresa } from "@prisma/client";

export default function Empresa({ id }: Empresa) {
  return (
    <>
      <GridHeader empresaId={id} />
      <Grid>
        <Suspense fallback={<GridLoading rows={4} />}>
          <GridServico id={id} />
        </Suspense>
      </Grid>
    </>
  );
}
