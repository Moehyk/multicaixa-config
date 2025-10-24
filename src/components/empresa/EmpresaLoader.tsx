import { getEmpresa } from "@/server/services";

import type { EmpresaData } from "@/types";

export default async function EmpresaLoader({
  children,
}: {
  children: (data: EmpresaData) => React.ReactNode;
}) {
  const { data } = await getEmpresa();

  if (!data) {
    return null;
  }

  return <>{children(data)}</>;
}
