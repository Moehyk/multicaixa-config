import { getEmpresa } from "@/server/services";

import DataHidrationBoundary from "./DataHidrationBoundary";
import React from "react";

export default async function EmpresaLoader({
  children,
}: React.PropsWithChildren) {
  const { data } = await getEmpresa();

  if (!data) {
    return null;
  }

  return (
    <DataHidrationBoundary empresa={data}>{children}</DataHidrationBoundary>
  );
}
