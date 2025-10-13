import { notFound } from "next/navigation";
import { getOnlyEmpresa } from "@/server/services";

import { EmpresaForm, FormCard } from "@/components/forms";

export default async function CriarEmpresaPage() {
  const { data } = await getOnlyEmpresa();

  if (!data) {
    notFound();
  }

  return (
    <FormCard header="Dados da Empresa">
      <EmpresaForm {...data} />
    </FormCard>
  );
}

export const dynamic = "force-dynamic";
