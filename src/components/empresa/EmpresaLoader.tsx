import { api } from "@/server";

import EmpresaModalForm from "./EmpresaModalForm";
import EmpresaWidget from "./EmpresaWidget";

export default async function EmpresaLoader() {
  const { data: empresa, message: eMessage } = await api.empresa.get();

  if (!empresa) throw new Error(eMessage);

  if (!empresa) {
    return <EmpresaModalForm />;
  }

  return <EmpresaWidget {...empresa} />;
}
