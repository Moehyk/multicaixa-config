import { notFound } from "next/navigation";
import { api } from "@/server";
import { EmpresaForm } from "@/components/empresa";

export default async function CriarEmpresaPage() {
  const { data } = await api.empresa.get();

  if (!data) {
    notFound();
  }

  return (
    <>
      <EmpresaForm {...data} />
    </>
  );
}

export const dynamic = "force-dynamic";
