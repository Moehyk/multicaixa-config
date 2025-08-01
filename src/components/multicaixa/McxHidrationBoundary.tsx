"use client";

import { useEmpresaStore, useServicoStore } from "@/context/mcx";
import type { Entidade, EmpresaMcxStore } from "@/types";
import type { Empresa } from "@prisma/client";

export default function McxHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: Entidade;
}) {
  useEmpresaStore().servicos = empresa.servicos;
  useEmpresaStore().desigEcra = empresa.desigEcra;

  return <>{children}</>;
}
