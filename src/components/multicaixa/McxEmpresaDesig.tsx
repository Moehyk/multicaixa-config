import React from "react";

import { empresaStore } from "@/context/mcx";

export default function McxEmpresaDesig() {
  const { desigEcra } = empresaStore();

  return (
    <div className="text-center uppercase text-white flex-1 pt-8">
      <h1 className="text-4xl font-bold">{desigEcra}</h1>
    </div>
  );
}
