"use client";

import { useMcxDataStore } from "@/context/mcx";
import type { McxDataStore } from "@/types";

export default function McxHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: McxDataStore;
}) {
  useMcxDataStore().servicos = empresa.servicos;
  useMcxDataStore().produtos = empresa.servicos.flatMap((s) => s.produtos);
  useMcxDataStore().desigEcra = empresa.desigEcra;

  return <>{children}</>;
}
