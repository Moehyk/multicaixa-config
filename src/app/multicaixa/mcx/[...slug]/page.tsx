import React from "react";

import type { Views } from "@/types";

export default async function DynamicMcxPage({
  params,
}: {
  params: Promise<{ slug: Views[] }>;
}) {
  const { slug } = await params;

  const target = slug[0];

  if (target === "servico") {
    return <div>Servico: {slug[1]}</div>;
  }

  return <div>Page</div>;
}
