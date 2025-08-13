import { Grid, GridHeader, GridServico } from "@/components";

export default function Empresa({ id }: { id: string }) {
  return (
    <>
      <GridHeader empresaId={id} />
      <Grid>
        <GridServico id={id} />
      </Grid>
    </>
  );
}
