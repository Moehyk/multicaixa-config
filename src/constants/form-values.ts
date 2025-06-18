import type { EmpresaForm, ServicoForm, ProdutoPagamentoForm } from "@/types";

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
  desig_ecra: "",
  desig_tecla_seleccao: "",
  desig_sistema: "",
};

export const initialProdutoPagamentoFormValues: ProdutoPagamentoForm = {
  id: "",
  desig_ecra: "",
  desig_tecla_seleccao: "",
  type: "pagamento",
  pagamento: {
    id: "",
    desig_referencia: "",
    tamanho_referencia: 3,
    texto_ecra_referencia: "",
    montante_minimo: 0.0,
    montante_maximo: 0.0,
  },
};
