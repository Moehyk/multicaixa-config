"use client";

import { initiateDataStore } from "@/context/mcx/data-store";
import type { DataStore } from "@/types";

export default function McxHidrationBoundary({
  children,
  empresa,
}: {
  children: React.ReactNode;
  empresa: DataStore;
}) {
  initiateDataStore(empresa);

  return <>{children}</>;
}
