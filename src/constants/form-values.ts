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
  numeroPessoaColectiva: "",
  numeroEntidade: "",
  desigEcra: "",
  desigTeclaSeleccao: "",
};

export const initialServicoFormValues: ServicoForm = {
  desigEcra: "",
  desigTeclaSeleccao: "",
  desigSistema: "",
};

export const initialProdutoPagamentoFormValues: ProdutoPagamentoForm = {
  desigEcra: "",
  desigTeclaSeleccao: "",
  pagamento: {
    isNew: true,
    desigReferencia: "",
    tamanhoReferencia: 9,
    textoEcraReferencia: "",
    montanteMin: 0.0,
    montanteMax: 0.0,
  },
};

export const initialProdutoRecargasFormValues: ProdutoRecargasForm = {
  desigEcra: "",
  desigTeclaSeleccao: "",
  recargas: {
    desigUnidade: "",
    montantes: [{ montante: 0.0, quantidade: 0, key: randomId() }],
  },
};

export const initialProdutoCarregamentoFormValues: ProdutoCarregamentoForm = {
  desigEcra: "",
  desigTeclaSeleccao: "",
  carregamento: {
    desigReferencia: "",
    tamanhoReferencia: 9,
    textoEcraReferencia: "",
    montanteTipo: "montante_livre",
    montanteMax: 0.0,
    montanteMin: 0.0,
    montantes: [{ montante: 0, descricao: "", key: randomId() }],
  },
};
