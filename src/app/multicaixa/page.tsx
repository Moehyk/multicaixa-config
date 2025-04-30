import { api } from "@/server";

import { PageDisplayer } from "@/components";
import { Breadcrumbs, Anchor, Card } from "@mantine/core";

const items = [{ title: "Entidades", href: "#" }].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default async function MulticaixaPage() {
  const { data: entidades } = await api.entidade.getAll();

  return (
    <>
      <Card withBorder>
        <Breadcrumbs>{items}</Breadcrumbs>
        <PageDisplayer title="Lista de Entidades" />
      </Card>
      <div>
        {entidades?.map((e) => (
          <div key={e.id}>
            <a href={`/multicaixa/entidade/${e.id}`}>{e.screenName}</a>
            <div>{e.id}</div>
          </div>
        ))}
      </div>
    </>
  );
}
