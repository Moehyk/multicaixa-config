import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db, getUser } from "..";
import { validateUser, processErrors } from "@/utils/errors";

import { Empresa } from "@prisma/client";
import type { EmpresaForm } from "@/types";

export const empresa = {
  create: async (input: EmpresaForm) => {
    const user = await getUser();

    try {
      validateUser(user);

      // 1. Prepare the where clause
      const where = input.id
        ? { id: input.id } // For updates
        : { utilizadorId: user.id }; // For creations

      // 2. Perform the upsert
      const empresa = await db.empresa.upsert({
        where,
        create: {
          utilizadorId: user.id,
          cae: input.cae,
          nome: input.nome,
          numero_pessoa_colectiva: input.numero_pessoa_colectiva,
          sigla: input.sigla,
          morada: input.morada,
          localidade: input.localidade,
          responsavel: input.responsavel,
          telefone: input.telefone,
          email: input.email,
          numero_entidade: input.numero_entidade,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
        },
        update: {
          cae: input.cae,
          nome: input.nome,
          numero_pessoa_colectiva: input.numero_pessoa_colectiva,
          sigla: input.sigla,
          morada: input.morada,
          localidade: input.localidade,
          responsavel: input.responsavel,
          telefone: input.telefone,
          email: input.email,
          numero_entidade: input.numero_entidade,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
        },
      });

      revalidatePath("/multicaixa", "page");

      // 3. Return minimal serializable data
      return {
        status: 200,
        message: input.id ? "Empresa atualizada" : "Empresa criada",
        data: empresa, // Return only essential data
      };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          id: !!input.id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  },

  get: cache(async () => {
    const user = await getUser();

    try {
      validateUser(user);

      const data = await db.empresa.findUnique({
        where: {
          utilizadorId: user.id,
        },
        include: {
          servicos: true,
        },
      });
      return { data, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          id: !!user.id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  }),
};
