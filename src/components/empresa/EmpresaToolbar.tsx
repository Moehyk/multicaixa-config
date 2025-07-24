import { getEmpresa } from "@/server/services";

import EmpresaName from "./EmpresaName";
import { Toolbar } from "../header";
import { McxTrigger, McxHidrationBoundary } from "../multicaixa";

export default async function EmpresaToolbar() {
  const { data } = await getEmpresa();

  if (!data) {
    return null;
  }

  return (
    <Toolbar>
      <McxHidrationBoundary empresa={data}>
        <EmpresaName name={data.nome} />
        <McxTrigger />
      </McxHidrationBoundary>
    </Toolbar>
  );
}
