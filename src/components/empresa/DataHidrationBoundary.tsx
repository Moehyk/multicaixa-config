"use client";

import { initiateEmpresaStore } from "@/context/mcx/data-store";
import type { EmpresaStore } from "@/types";

export default function DataHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: EmpresaStore;
}) {
  initiateEmpresaStore(empresa);

  return <>{children}</>;
}
