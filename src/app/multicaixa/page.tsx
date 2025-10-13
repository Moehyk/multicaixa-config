import { getEmpresa, getUser } from "@/server/services";

import { UserLoader } from "@/context/user";

import { NoEmpresa, ServicosList } from "@/components";

export default async function MulticaixaPage() {
  return <ServicosList />;
}

export const dynamic = "force-dynamic";
