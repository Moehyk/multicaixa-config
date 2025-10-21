import { getEmpresa } from "@/server/services";

import {
  NoEmpresa,
  ServicosList,
  GridHeader,
  GridNoServico,
  ErrorWidget,
} from "@/components";

export default async function MulticaixaPage() {
  const { data } = await getEmpresa();

  if (!data) {
    return <NoEmpresa />;
  }

  if (data.servicos.length === 0) {
    return (
      <>
        <GridHeader id={data.id} />
        <GridNoServico />
      </>
    );
  }

  return (
    <>
      <GridHeader id={data.id} />
      <ServicosList servicos={data.servicos} />
    </>
  );
}

export const dynamic = "force-dynamic";
