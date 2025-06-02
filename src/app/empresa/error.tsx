"use client";

import { ErrorWidget } from "@/components";

export default function EmpresaError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <ErrorWidget error={error} />;
}
