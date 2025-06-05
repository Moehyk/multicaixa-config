import type { EmpresaForm, ServicoForm } from "@/types";

export const initialEmpresaFormValues: EmpresaForm = {
  id: "",
  utilizadorId: "",
  nome: "",
  sigla: "",
  morada: "",
  localidade: "",
  responsavel: "",
  telefone: "",
  email: "",
  cae: "",
  numero_pessoa_colectiva: "",
  numero_entidade: "",
  desig_ecra: "",
  desig_tecla_seleccao: "",
};

export const initialServicoFormValues: ServicoForm = {
  id: "",
  empresaId: "",
  desig_ecra: "",
  desig_tecla_seleccao: "",
  desig_sistema: "",
};
