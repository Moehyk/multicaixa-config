import { api } from "@/server";
import { redirect } from "next/navigation";

import { PageDisplayer } from "@/components";
import { Breadcrumbs, Anchor, Card } from "@mantine/core";

const items = [{ title: "Entidades", href: "#" }].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default async function MulticaixaPage() {
  const user = api.user.get();

  if (!user) redirect("/api/auth/login?post_login_redirect_url=/");

  return (
    <>
      <Card withBorder>Mambos irão aparecer aqui</Card>
    </>
  );
}
