"use client";

import { useMcxDataStore } from "@/context/mcx";
import type { DataStore } from "@/types";

export default function McxHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: DataStore;
}) {
  useMcxDataStore().servicos = empresa.servicos;
  useMcxDataStore().produtos = empresa.servicos.flatMap((s) => s.produtos);
  useMcxDataStore().desigEcra = empresa.desigEcra;

  return <>{children}</>;
}
