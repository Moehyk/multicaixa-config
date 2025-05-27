import { api } from "@/server";
import { Card, Button } from "@mantine/core";
import { EmpresaForm } from "@/components/empresa";

export default async function CriarEmpresaPage() {
  const { data } = await api.empresa.get();

  const header = data ? data.nome : "Criar Empresa";

  return (
    <Card withBorder p={32}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{header}</h1>
        {data && <Button>Editar</Button>}
      </div>
      <EmpresaForm id={data?.id} />
    </Card>
  );
}
