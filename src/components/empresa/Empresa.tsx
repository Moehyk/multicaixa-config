import { Grid, GridHeader } from "@/components";
import { ServicoLoader } from "../servico";

export default function Empresa({ id }: { id: string }) {
  return (
    <>
      <GridHeader id={id} />
      <Grid>
        <ServicoLoader id={id} />
      </Grid>
    </>
  );
}
