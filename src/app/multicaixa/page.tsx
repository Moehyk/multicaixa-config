import { api } from "@/server";
import { redirect } from "next/navigation";

import { Grid } from "@/components";
import { Breadcrumbs, Anchor, Card } from "@mantine/core";

const items = [{ title: "Serviços", href: "/multicaixa" }].map(
  (item, index) => (
    <Anchor href={item.href} key={index} className="font-semibold">
      {item.title}
    </Anchor>
  )
);

export default async function MulticaixaPage() {
  const { data: empresa, message: eMessage } = await api.empresa.get();

  if (!empresa) throw new Error(eMessage);

  const { data: servicos, message: sMessage } = await api.servico.getAll(
    empresa.id
  );

  if (!servicos) throw new Error(sMessage);

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Grid action="SERVICO">
        <Grid.Card title="Serviço 1" action="SERVICO" />
        <Grid.Card title="Serviço 2" action="SERVICO" />
        <Grid.Card title="Serviço 3" action="SERVICO" />
        <Grid.Card title="Serviço 4" action="SERVICO" />
        <Grid.Card title="Serviço 5" action="SERVICO" />
        <Grid.Card title="Serviço 6" action="SERVICO" />
      </Grid>
    </>
  );
}
