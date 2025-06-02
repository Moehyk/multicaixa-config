import { api } from "@/server";
import { Card, Button, ThemeIcon } from "@mantine/core";
import { EmpresaForm } from "@/components/empresa";

import { IconExclamationCircle } from "@tabler/icons-react";

export default async function CriarEmpresaPage() {
  const { data, message } = await api.empresa.get();

  if (!data) throw new Error(message);

  return (
    <>
      <Card withBorder p={0}>
        <h1 className="text-2xl font-semibold p-8">{data.nome}</h1>
        <EmpresaForm {...data} />
      </Card>
    </>
  );
}
