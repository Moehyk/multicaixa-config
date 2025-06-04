import { api } from "@/server";
import { Card, Skeleton } from "@mantine/core";
import { EmpresaForm, EmpresaLoading } from "@/components/empresa";

export default async function CriarEmpresaPage() {
  const { data, message } = await api.empresa.get();

  if (!data) throw new Error(message);

  const { servicos, ...empresaData } = data;

  return (
    <>
      <EmpresaForm {...empresaData} />
    </>
  );
}
