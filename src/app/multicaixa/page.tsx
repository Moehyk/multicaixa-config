import { getEmpresa } from "@/server/services";

import {
  NoEmpresa,
  ServicosList,
  GridHeader,
  GridNoServico,
  GridError,
} from "@/components";

export default async function MulticaixaPage() {
  const { data, error, message } = await getEmpresa();

  if (error) {
    return <GridError message={message} />;
  }

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
