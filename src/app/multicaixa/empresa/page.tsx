import { notFound } from "next/navigation";
import { getEmpresa } from "@/server/services";
import { EmpresaForm } from "@/components/empresa";

export default async function CriarEmpresaPage() {
  const { data } = await getEmpresa();

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
