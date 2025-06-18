import { getEmpresa } from "@/server/services";

import EmpresaWidget from "./EmpresaWidget";

export default async function EmpresaLoader() {
  const { data } = await getEmpresa();

  if (!data) {
    return <></>;
  }

  return <EmpresaWidget {...data} />;
}
