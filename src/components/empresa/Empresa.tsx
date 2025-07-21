import { Suspense } from "react";
import { Grid, GridHeader, GridServico } from "@/components";

import type { Empresa } from "@prisma/client";

export default function Empresa({ id }: Empresa) {
  return (
    <>
      <GridHeader empresaId={id} />
      <Grid>
        <GridServico id={id} />
      </Grid>
    </>
  );
}
