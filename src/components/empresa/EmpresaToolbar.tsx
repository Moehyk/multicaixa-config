import { getEmpresa } from "@/server/services";

import EmpresaName from "./EmpresaName";
import Link from "next/link";
import { Toolbar } from "../header";
import { McxTrigger } from "../multicaixa";

export default async function EmpresaToolbar() {
  const { data } = await getEmpresa();

  if (!data) {
    return null;
  }

  return (
    <Toolbar>
      <EmpresaName name={data.nome} />
      <McxTrigger />
    </Toolbar>
  );
}
