import { getOnlyEmpresa } from "@/server/services";

import { NoEmpresa, ServicosList } from "@/components";

export default async function MulticaixaPage() {
  const { data } = await getOnlyEmpresa();

  if (!data) {
    return <NoEmpresa />;
  }

  return <ServicosList />;
}

export const dynamic = "force-dynamic";
