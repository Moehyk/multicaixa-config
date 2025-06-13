import { api } from "@/server";

import EmpresaWidget from "./EmpresaWidget";

export default async function EmpresaLoader() {
  const { data } = await api.empresa.get();

  if (!data) {
    return <></>;
  }

  return <EmpresaWidget {...data} />;
}
