import { getEmpresa } from "@/server/services";

import {
  NoEmpresa,
  ServicosList,
  GridHeader,
  GridNoServico,
} from "@/components";

export default async function MulticaixaPage() {
  const { data } = await getEmpresa();

  if (!data) {
    return <NoEmpresa />;
  }

  return (
    <>
      <GridHeader id={data.id} />
      {data.servicos.length === 0 && <GridNoServico />}
      {data.servicos.length > 0 && (
        <ServicosList
          servicos={data.servicos}
          empresaDesigEcra={data.desigEcra}
        />
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
