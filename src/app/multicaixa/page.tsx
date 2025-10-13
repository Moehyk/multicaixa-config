import { getOnlyEmpresa } from "@/server/services";

import { NoEmpresa, ServicosLoader } from "@/components";

export default async function MulticaixaPage() {
  const { data } = await getOnlyEmpresa();

  if (!data) {
    return <NoEmpresa />;
  }

  return <ServicosLoader id={data.id} />;
}

export const dynamic = "force-dynamic";
