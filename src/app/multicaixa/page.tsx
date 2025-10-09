import { getEmpresa } from "@/server/services";

import { NoEmpresa, ServicosList } from "@/components";

export default async function MulticaixaPage() {
  const { data: empresa } = await getEmpresa();

  if (!empresa) {
    return <NoEmpresa />;
  }

  return <ServicosList />;
}

export const dynamic = "force-dynamic";
