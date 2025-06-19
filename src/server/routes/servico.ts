import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import {
  validateCuid,
  validateUser,
  validateInputs,
  throwValidationError,
  processErrors,
} from "@/utils/errors";

import { ServicoForm } from "@/types";

export const servico = {
  create: async (empresaId: string, input: ServicoForm) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(empresaId);
    const { isInputsValid, message } = validateInputs(input);

    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: "empresa",
        inputs: isInputsValid,
        message,
      });

      const servico = await db.servico.create({
        data: {
          empresaId,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
          desig_sistema: input.desig_sistema,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Serviço criado",
        data: servico,
      };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          cuid: isCuidValid,
          inputs: isInputsValid,
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
  update: async (input: ServicoForm) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(input.id);
    const { isInputsValid, message } = validateInputs(input);

    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: "servico",
        inputs: isInputsValid,
        message,
      });

      const servico = await db.servico.update({
        where: {
          id: input.id,
        },
        data: {
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
          desig_sistema: input.desig_sistema,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Serviço actualizado",
        data: servico,
      };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          cuid: isCuidValid,
          inputs: isInputsValid,
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

  get: cache(async (id: string) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(id);

    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: "servico",
        inputs: true,
      });

      const servico = await db.servico.findUnique({
        where: {
          id: id,
        },
        include: {
          produtos: true,
        },
      });

      return { data: servico, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          cuid: isCuidValid,
          inputs: true,
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

  getAll: cache(async (id: string) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(id);

    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: "empresa",
        inputs: true,
      });

      const servicos = await db.servico.findMany({
        where: {
          empresaId: id,
        },
        include: {
          produtos: true,
        },
      });

      return { data: servicos, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          cuid: isCuidValid,
          inputs: true,
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

  delete: async (id: string) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(id);
    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: "servico",
        inputs: true,
      });

      await db.servico.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "Serviço removido." };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          cuid: isCuidValid,
          inputs: true,
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
};
