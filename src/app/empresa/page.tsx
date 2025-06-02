import { api } from "@/server";
import { Card, Button } from "@mantine/core";
import { EmpresaForm } from "@/components/empresa";

export default async function CriarEmpresaPage() {
  const { data } = await api.empresa.get();

  if (!data) {
    return <div>Ups...</div>;
  }

  return (
    <Card withBorder p={0}>
      <h1 className="text-2xl font-semibold p-8">{data.nome}</h1>
      <EmpresaForm {...data} />
    </Card>
  );
}
