import { Grid, GridHeader, GridServico } from "@/components";

export default function Empresa({ id }: { id: string }) {
  return (
    <>
      <GridHeader id={id} />
      <Grid>
        <GridServico id={id} />
      </Grid>
    </>
  );
}
