import { z } from "zod";

export const empresaSchema = z.object({
  nome: z.string().min(1, { message: "Campo obrigatório." }),
  sigla: z.string().min(1, { message: "Campo obrigatório." }),
  morada: z.string().min(1, { message: "Campo obrigatório." }),
  localidade: z.string().min(1, { message: "Campo obrigatório." }),
  responsavel: z.string().min(1, { message: "Campo obrigatório." }),
  telefone: z
    .string()
    .startsWith("9")
    .length(9, { message: "Número de telemóvel inválido." }),
  email: z.string().email({ message: "Email inválido." }),
  cae: z.string().min(3),
  numero_pessoa_colectiva: z.string().min(3),
  logo: z.string().optional(),
  numero_entidade: z.string().min(3),
  desig_ecra: z.string().min(3),
  desig_tecla_seleccao: z.string().min(3),
});
