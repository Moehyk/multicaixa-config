"use client";

import { ErrorWidget } from "@/components";
import type { ErrorBoundaryProps } from "@/types";

export default function ProdutoError(props: ErrorBoundaryProps) {
  return <ErrorWidget {...props} />;
}
