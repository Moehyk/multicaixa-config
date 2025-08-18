import React from "react";

import type { CarregamentoData } from "@/types";

export default function McxCarregamentos({
  desigReferencia,
}: NonNullable<CarregamentoData>) {
  return <div>{desigReferencia}</div>;
}
