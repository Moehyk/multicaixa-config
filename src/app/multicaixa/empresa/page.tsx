import { notFound } from "next/navigation";
import { getOnlyEmpresa } from "@/server/services";

import { EmpresaForm } from "@/components/forms";

export default async function CriarEmpresaPage() {
  const { data } = await getOnlyEmpresa();

  if (!data) {
    notFound();
  }

  return <EmpresaForm {...data} />;
}

export const dynamic = "force-dynamic";
