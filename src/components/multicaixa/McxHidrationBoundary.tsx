"use client";

import { empresaStore } from "@/context/mcx";
import type { EmpresaMcxStore } from "@/types";
import type { Empresa } from "@prisma/client";

export default function McxHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: EmpresaMcxStore;
}) {
  console.log("empresa", empresa);

  empresaStore().servicos = empresa.servicos;
  empresaStore().desigEcra = empresa.desigEcra;

  return <>{children}</>;
}
