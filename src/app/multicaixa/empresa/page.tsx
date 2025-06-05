import { notFound } from "next/navigation";
import { api } from "@/server";
import { EmpresaForm } from "@/components/empresa";

export default async function CriarEmpresaPage() {
  const { data } = await api.empresa.get();

  if (!data) {
    notFound();
  }

  const { servicos, ...empresaData } = data;

  return (
    <>
      <EmpresaForm {...empresaData} />
    </>
  );
}

export const dynamic = "force-dynamic";
