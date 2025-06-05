import { api } from "@/server";

import EmpresaModalForm from "./EmpresaModalForm";
import EmpresaWidget from "./EmpresaWidget";

export default async function EmpresaLoader() {
  const { data, message } = await api.empresa.get();

  if (!data) {
    return <EmpresaModalForm />;
  }

  return <EmpresaWidget {...data} />;
}
