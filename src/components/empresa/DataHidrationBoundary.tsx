"use client";

import { useRef } from "react";
import { initiateEmpresaStore } from "@/context/mcx/data-store";
import type { EmpresaData } from "@/types";

export default function DataHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: EmpresaData;
}) {
  const ref = useRef(false);

  if (!ref.current) {
    initiateEmpresaStore(empresa);
    ref.current = true;
  }

  return <>{children}</>;
}
