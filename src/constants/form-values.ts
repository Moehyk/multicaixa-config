import { randomId } from "@mantine/hooks";

import type {
  EmpresaForm,
  ServicoForm,
  ProdutoPagamentoForm,
  ProdutoRecargasForm,
  ProdutoCarregamentoForm,
} from "@/types";

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
  desig_ecra: "",
  desig_tecla_seleccao: "",
  desig_sistema: "",
};

export const initialProdutoPagamentoFormValues: ProdutoPagamentoForm = {
  desig_ecra: "",
  desig_tecla_seleccao: "",
  pagamento: {
    isNew: true,
    desig_referencia: "",
    tamanho_referencia: 9,
    texto_ecra_referencia: "",
    montante_minimo: 0.0,
    montante_maximo: 0.0,
  },
};

export const initialProdutoRecargasFormValues: ProdutoRecargasForm = {
  desig_ecra: "",
  desig_tecla_seleccao: "",
  recargas: {
    desig_unidade: "",
    montantes: [{ montante: 0.0, quantidade: 0, key: randomId() }],
  },
};

export const initialProdutoCarregamentoFormValues: ProdutoCarregamentoForm = {
  desig_ecra: "",
  desig_tecla_seleccao: "",
  carregamento: {
    desig_referencia: "",
    tamanho_referencia: 9,
    texto_ecra_referencia: "",
    montante_tipo: "montante_livre",
    montante_maximo: 0.0,
    montante_minimo: 0.0,
    montantes: [{ montante: 0, descricao: "", key: randomId() }],
  },
};
