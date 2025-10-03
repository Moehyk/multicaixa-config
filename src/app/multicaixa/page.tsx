import { getEmpresa } from "@/server/services";

import { NoEmpresa, EmpresaLoader, ServicosList } from "@/components";

export default async function MulticaixaPage() {
  const { data: empresa } = await getEmpresa();

  if (!empresa) {
    return <NoEmpresa />;
  }

  return (
    <EmpresaLoader>
      <ServicosList />
    </EmpresaLoader>
  );
}

export const dynamic = "force-dynamic";
