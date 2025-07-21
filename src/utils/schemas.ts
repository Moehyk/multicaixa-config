import { z } from "zod";

const nome = z.string().min(1, { message: "Campo obrigatório." });
const sigla = z.string().min(1, { message: "Campo obrigatório." });
const morada = z.string().min(1, { message: "Campo obrigatório." });
const localidade = z.string().min(1, { message: "Campo obrigatório." });
const cae = z.string().min(5, { message: "Número CAE inválido." });
const numeroPessoaColectiva = z
  .string()
  .min(10, { message: "Número Pessoa Colectiva inválido." });

const responsavel = z.string().min(1, { message: "Campo obrigatório." });
const telefone = z
  .string()
  .startsWith("9")
  .length(9, { message: "Número de telemóvel inválido." });
const email = z.string().email({ message: "Email inválido." });
const numeroEntidade = z.string().min(3);
const desigEcra = z
  .string()
  .min(1, { message: "Campo obrigatório." })
  .max(15, { message: "Não pode ter mais de 15 caracteres." });
const desigTeclaSeleccao = z
  .string()
  .min(1, { message: "Campo obrigatório." })
  .max(18, { message: "Não pode ter mais de 18 caracteres." });
const desigReferencia = z
  .string()
  .min(1, { message: "Campo obrigatório." })
  .max(15, { message: "Não pode ter mais de 15 caracteres." });
const tamanhoReferencia = z
  .number()
  .min(9, { message: "Campo obrigatório." })
  .max(15, { message: "Não pode ter mais de 15 dígitos." });
const textoEcraReferencia = z
  .string()
  .min(1, { message: "Campo obrigatório." })
  .max(60, { message: "Não pode ter mais de 60 caracteres." });
const montanteMin = z.number().min(1, { message: "Campo obrigatório." });
const montanteMax = z.number().min(1, { message: "Campo obrigatório." });
const montantes = z.array(
  z.object({
    montante: z.number().min(1, { message: "Campo obrigatório." }),
    descricao: z
      .string()
      .min(1, { message: "Campo obrigatório." })
      .max(18, { message: "Não pode ter mais de 18 caracteres." }),
  })
);

export const empresaStepOneSchema = z.object({
  nome,
  sigla,
  morada,
  localidade,
  cae,
  numeroPessoaColectiva,
});

export const empresaStepTwoSchema = z.object({
  responsavel,
  telefone,
  email,
});

export const empresaStepThreeSchema = z.object({
  numeroEntidade,
  desigEcra,
  desigTeclaSeleccao,
});

export const empresaSchema = z.object({
  nome,
  sigla,
  morada,
  localidade,
  cae,
  numeroPessoaColectiva,
  responsavel,
  telefone,
  email,
  numeroEntidade,
  desigEcra,
  desigTeclaSeleccao,
});

export const servicoSchema = z.object({
  desigEcra,
  desigTeclaSeleccao,
  desigSistema: z
    .string()
    .min(1, { message: "Campo obrigatório." })
    .max(40, { message: "Não pode ter mais de 40 caracteres." }),
});

const pagamentoSchema = z.object({
  desigReferencia,
  tamanhoReferencia,
  textoEcraReferencia,
  montanteMin,
  montanteMax,
});

const recargaSchema = z.object({
  desigUnidade: z.string().min(1, { message: "Campo obrigatório." }),
  montantes: z.array(
    z.object({
      montante: z.number().min(1, { message: "Campo obrigatório." }),
      quantidade: z.number().min(1, { message: "Campo obrigatório." }),
    })
  ),
});

const montanteTipoEnum = z.enum([
  "montante_livre",
  "montante_pre_definido",
  "ambos",
]);

const carregamentoSchema = z.discriminatedUnion("montanteTipo", [
  z.object({
    montanteTipo: montanteTipoEnum.extract(["montante_livre"]),
    desigReferencia,
    tamanhoReferencia,
    textoEcraReferencia,
    montanteMin,
    montanteMax,
  }),
  z.object({
    desigReferencia,
    tamanhoReferencia,
    textoEcraReferencia,
    montanteTipo: montanteTipoEnum.extract(["montante_pre_definido"]),
    montantes,
  }),
  z.object({
    montanteTipo: montanteTipoEnum.extract(["ambos"]),
    desigReferencia,
    tamanhoReferencia,
    textoEcraReferencia,
    montanteMin,
    montanteMax,
    montantes,
  }),
]);

export const produtoPagamentoSchema = z.object({
  desigEcra,
  desigTeclaSeleccao,
  pagamento: pagamentoSchema,
});

export const produtoRecargasSchema = z.object({
  desigEcra,
  desigTeclaSeleccao,
  recargas: recargaSchema,
});

export const produtoCarregamentoSchema = z.object({
  desigEcra,
  desigTeclaSeleccao,
  carregamento: carregamentoSchema,
});
