"use client";

import { useRef } from "react";
import {
  createEmpresaStore,
  McxDataContext,
  McxDataStore,
} from "@/context/mcx/data-store";

import type { McxDataProps } from "@/types";

export default function McxDataProvider({
  children,
  ...props
}: React.PropsWithChildren<McxDataProps>) {
  const storeRef = useRef<McxDataStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createEmpresaStore(props);
  }

  return (
    <McxDataContext.Provider value={storeRef.current}>
      {children}
    </McxDataContext.Provider>
  );
}
