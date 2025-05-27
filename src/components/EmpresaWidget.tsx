import { initEmpresa } from "@/server/services";

export default async function EmpresaWidget() {
  const { empresaExist, empresa } = await initEmpresa();
  return <div>EmpresaWidget</div>;
}
