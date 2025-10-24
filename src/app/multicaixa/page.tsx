import { getEmpresa } from "@/server/services";

import {
  NoEmpresa,
  ServicosList,
  GridHeader,
  GridNoServico,
  EmpresaLoader,
} from "@/components";

export default function MulticaixaPage() {
  return (
    <EmpresaLoader>
      {(data) => (
        <>
          {!data && <NoEmpresa />}
          {data && (
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
          )}
        </>
      )}
    </EmpresaLoader>
  );
}

export const dynamic = "force-dynamic";
