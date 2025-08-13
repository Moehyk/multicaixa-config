import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { getUser } from "../services";
import { validateUser, processErrors } from "@/utils/errors";

import type { EmpresaForm, DataStore } from "@/types";

export const empresa = {
  create: async (input: EmpresaForm) => {
    const { data: user } = await getUser();

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
          desigEcra: input.desigEcra,
          desigTeclaSeleccao: input.desigTeclaSeleccao,
          nome: input.nome,
          numeroEntidade: input.numeroEntidade,
          numeroPessoaColectiva: input.numeroPessoaColectiva,
          sigla: input.sigla,
          responsavel: input.responsavel,
          telefone: input.telefone,
          email: input.email,
          morada: input.morada,
          localidade: input.localidade,
        },
        update: {
          cae: input.cae,
          desigEcra: input.desigEcra,
          desigTeclaSeleccao: input.desigTeclaSeleccao,
          nome: input.nome,
          numeroEntidade: input.numeroEntidade,
          numeroPessoaColectiva: input.numeroPessoaColectiva,
          sigla: input.sigla,
          responsavel: input.responsavel,
          telefone: input.telefone,
          email: input.email,
          morada: input.morada,
          localidade: input.localidade,
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
          noId: !!input.id,
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
    const { data: user } = await getUser();

    try {
      validateUser(user);

      const data = (await db.empresa.findUnique({
        where: {
          utilizadorId: user.id,
        },
        include: {
          servicos: {
            include: {
              produtos: {
                include: {
                  pagamento: true,
                  recargas: {
                    include: {
                      montantes: true,
                    },
                  },
                  carregamento: {
                    include: {
                      montantes: true,
                    },
                  },
                },
              },
            },
          },
        },
      })) as DataStore;

      return { data, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!user.id,
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

  getOnly: cache(async () => {
    const { data: user } = await getUser();

    try {
      validateUser(user);

      const data = await db.empresa.findUnique({
        where: {
          utilizadorId: user.id,
        },
      });

      return { data, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!user.id,
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
