import { api } from "@/server";
import { redirect } from "next/navigation";

import { PageDisplayer, Grid, GridCard, NewGridItem } from "@/components";
import { Breadcrumbs, Anchor, Card } from "@mantine/core";

const items = [{ title: "Entidades", href: "#" }].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default async function MulticaixaPage() {
  const user = await api.user.get();
  if (!user) redirect("/api/auth/login?post_login_redirect_url=/dashboard");

  const { data, status } = await api.empresa.get();

  console.log("data", data);

  if (status === 200 && !data) {
    redirect("/empresa");
  }

  return (
    <>
      <Card withBorder>
        <Breadcrumbs>{items}</Breadcrumbs>
        <PageDisplayer title="Lista de Entidades" />
      </Card>
    </>
  );
}
