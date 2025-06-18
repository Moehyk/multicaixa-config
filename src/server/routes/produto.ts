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

import { ProdutoForm, ServicoForm } from "@/types";

export const produto = {
  create: async (servicoId: string, input: ProdutoForm) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(servicoId);
    const { isInputsValid, message } = validateInputs(input);

    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: "servico",
        inputs: isInputsValid,
        message,
      });

      const produto = await db.produto.create({
        data: {
          servicoId: servicoId,
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
          type: input.type,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Produto criado",
        data: produto,
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

  update: async (input: ProdutoForm) => {
    const user = await validateUser();
    const isCuidValid = validateCuid(input.id);
    const { isInputsValid, message } = validateInputs(input);

    try {
      throwValidationError({
        user,
        cuid: isCuidValid,
        data: "produto",
        inputs: isInputsValid,
        message,
      });

      const produto = await db.produto.update({
        where: {
          id: input.id,
        },
        data: {
          desig_ecra: input.desig_ecra,
          desig_tecla_seleccao: input.desig_tecla_seleccao,
        },
      });

      revalidatePath("/multicaixa", "page");

      return {
        status: 200,
        message: "Produto actualizado",
        data: produto,
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
        data: "produto",
        inputs: true,
      });

      const produto = await db.produto.findUnique({
        where: {
          id: id,
        },
        include: {
          carregamento: true,
          pagamento: true,
          recargas: true,
        },
      });

      return { data: produto, status: 200 };
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
        data: "servico",
        inputs: true,
      });

      const produtos = await db.produto.findMany({
        where: {
          servicoId: id,
        },
      });

      return { status: 200, data: produtos };
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
        data: "produto",
        inputs: true,
      });

      await db.produto.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/multicaixa", "page");

      return { status: 200, message: "Produto apagado com sucesso." };
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
