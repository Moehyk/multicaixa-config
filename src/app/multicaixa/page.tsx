import { getEmpresa } from "@/server/services";

import { NoEmpresa, Empresa } from "@/components/empresa";

export default async function MulticaixaPage() {
  const { data: empresa } = await getEmpresa();

  if (!empresa) {
    return <NoEmpresa />;
  }

  return <Empresa {...empresa} />;
}

export const dynamic = "force-dynamic";
