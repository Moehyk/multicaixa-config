"use client";

import { mcxEmpresaStore } from "@/context/mcx";

import NoEmpresa from "./NoEmpresa";
import { ServicosList } from "../servico";

export default function Empresa() {
  const { empresa, servicos } = mcxEmpresaStore();

  if (!empresa) {
    return <NoEmpresa />;
  }
  return <ServicosList empresaId={empresa.id} servicos={servicos} />;
}
