import { api } from "@/server";
import { EmpresaForm } from "@/components/empresa";

export default async function CriarEmpresaPage() {
  const { data, message } = await api.empresa.get();

  if (!data) throw new Error(message);

  const { servicos, ...empresaData } = data;

  return (
    <>
      <EmpresaForm {...empresaData} />
    </>
  );
}
