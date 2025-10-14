"use client";

import { initiateEmpresaStore } from "@/context/mcx/data-store";
import type { EmpresaData } from "@/types";

export default function DataHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: EmpresaData;
}) {
  initiateEmpresaStore(empresa);

  return <>{children}</>;
}
