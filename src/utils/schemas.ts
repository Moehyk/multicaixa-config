import { z } from "zod";

const nome = z.string().min(1, { message: "Campo obrigatório." });
const sigla = z.string().min(1, { message: "Campo obrigatório." });
const morada = z.string().min(1, { message: "Campo obrigatório." });
const localidade = z.string().min(1, { message: "Campo obrigatório." });
const cae = z.string().min(5, { message: "Número CAE inválido." });
const numero_pessoa_colectiva = z
  .string()
  .min(10, { message: "Número Pessoa Colectiva inválido." });

const responsavel = z.string().min(1, { message: "Campo obrigatório." });
const telefone = z
  .string()
  .startsWith("9")
  .length(9, { message: "Número de telemóvel inválido." });
const email = z.string().email({ message: "Email inválido." });
const numero_entidade = z.string().min(3);
const desig_ecra = z.string().min(3);
const desig_tecla_seleccao = z.string().min(3);

export const empresaStepOneSchema = z.object({
  nome,
  sigla,
  morada,
  localidade,
  cae,
  numero_pessoa_colectiva,
});

export const empresaStepTwoSchema = z.object({
  responsavel,
  telefone,
  email,
});

export const empresaStepThreeSchema = z.object({
  numero_entidade,
  desig_ecra,
  desig_tecla_seleccao,
});

export const empresaSchema = z.object({
  nome,
  sigla,
  morada,
  localidade,
  cae,
  numero_pessoa_colectiva,
  responsavel,
  telefone,
  email,
  numero_entidade,
  desig_ecra,
  desig_tecla_seleccao,
});

export const servicoSchema = z.object({
  desig_ecra: z.string().min(1, { message: "Campo obrigatório." }),
  desig_tecla_seleccao: z.string().min(1, { message: "Campo obrigatório." }),
  desig_sistema: z.string().min(1, { message: "Campo obrigatório." }),
});
