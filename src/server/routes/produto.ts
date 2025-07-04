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

import {
  ProdutoPagamentoForm,
  ProdutoPagamentoUpdateForm,
  ProdutoRecargasForm,
  ProdutoRecargasUpdateForm,
  ProdutoCarregamentoForm,
  ProdutoCarregamentoUpdateForm,
} from "@/types";

export const produto = {
  pagamento: {
    create: async (id: string, input: ProdutoPagamentoForm) => {
      const user = await validateUser();
      const isCuidValid = validateCuid(id);
      const { isInputsValid, message } = validateInputs({
        desig_ecra: input.desig_ecra,
        desig_tecla_seleccao: input.desig_tecla_seleccao,
      });

      try {
        throwValidationError({
          user,
          cuid: isCuidValid,
          data: "servico",
          inputs: isInputsValid,
          message,
        });

        const produtoPagamento = await db.produto.create({
          data: {
            servicoId: id,
            type: "pagamento",
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            pagamento: {
              create: {
                ...input.pagamento,
                isNew: true,
              },
            },
          },
          include: {
            pagamento: true,
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Pagamento criado",
          data: produtoPagamento,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            cuid: true,
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
    update: async (id: string, input: ProdutoPagamentoUpdateForm) => {
      const user = await validateUser();
      const isCuidValid = validateCuid(id);
      const { isInputsValid, message } = validateInputs({
        desig_ecra: input.desig_ecra,
        desig_tecla_seleccao: input.desig_tecla_seleccao,
      });

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
            id,
          },
          data: {
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            pagamento: {
              update: {
                where: {
                  id: input.pagamento.id,
                },
                data: {
                  desig_referencia: input.pagamento.desig_referencia,
                  tamanho_referencia: input.pagamento.tamanho_referencia,
                  texto_ecra_referencia: input.pagamento.texto_ecra_referencia,
                  montante_minimo: input.pagamento.montante_minimo,
                  montante_maximo: input.pagamento.montante_maximo,
                },
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Pagamento actualizado",
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
  },
  recargas: {
    create: async (id: string, input: ProdutoRecargasForm) => {
      const user = await validateUser();
      const isCuidValid = validateCuid(id);
      const { isInputsValid, message } = validateInputs({
        desig_ecra: input.desig_ecra,
        desig_tecla_seleccao: input.desig_tecla_seleccao,
      });

      try {
        throwValidationError({
          user,
          cuid: isCuidValid,
          data: "servico",
          inputs: isInputsValid,
          message,
        });

        const produtoRecargas = await db.produto.create({
          data: {
            servicoId: id,
            type: "recargas",
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            recargas: {
              create: {
                desig_unidade: input.recargas.desig_unidade,
                montantes: {
                  createMany: {
                    data: input.recargas.montantes.map((m) => ({
                      montante: m.montante,
                      quantidade: m.quantidade,
                    })),
                  },
                },
              },
            },
          },
          include: {
            recargas: {
              include: {
                montantes: true,
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        // 3. Return minimal serializable data
        return {
          status: 200,
          message: "Produto Recargas criado",
          data: produtoRecargas, // Return only essential data
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            cuid: true,
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
    update: async (id: string, input: ProdutoRecargasUpdateForm) => {
      const user = await validateUser();
      const isCuidValid = validateCuid(id);
      const { isInputsValid, message } = validateInputs({
        desig_ecra: input.desig_ecra,
        desig_tecla_seleccao: input.desig_tecla_seleccao,
      });

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
            id,
          },
          data: {
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            recargas: {
              update: {
                data: {
                  desig_unidade: input.recargas.desig_unidade,
                  montantes: {
                    updateMany: {
                      where: {
                        id: {
                          in: input.recargas.montantes.map((m) => m.id),
                        },
                        recargaId: input.recargas.id,
                      },
                      data: input.recargas.montantes,
                    },
                  },
                },
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Recargas actualizado",
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
  },

  carregamento: {
    create: async (id: string, input: ProdutoCarregamentoForm) => {
      const user = await validateUser();
      const isCuidValid = validateCuid(id);
      const { isInputsValid, message } = validateInputs({
        desig_ecra: input.desig_ecra,
        desig_tecla_seleccao: input.desig_tecla_seleccao,
      });

      try {
        throwValidationError({
          user,
          cuid: isCuidValid,
          data: "servico",
          inputs: isInputsValid,
          message,
        });

        const produtoCarregamento = await db.produto.create({
          data: {
            servicoId: id,
            type: "carregamentos",
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            carregamento: {
              create: {
                desig_referencia: input.carregamento.desig_referencia,
                tamanho_referencia: input.carregamento.tamanho_referencia,
                texto_ecra_referencia: input.carregamento.texto_ecra_referencia,
                montante_tipo: input.carregamento.montante_tipo,
                montante_maximo: input.carregamento.montante_maximo,
                montante_minimo: input.carregamento.montante_minimo,
                montantes: {
                  createMany: {
                    data: input.carregamento.montantes.map((m) => ({
                      descricao: m.descricao,
                      montante: m.montante,
                    })),
                  },
                },
              },
            },
          },
          include: {
            carregamento: {
              include: {
                montantes: true,
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Carregamento criado",
          data: produtoCarregamento,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            cuid: true,
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

    update: async (id: string, input: ProdutoCarregamentoUpdateForm) => {
      const user = await validateUser();
      const isCuidValid = validateCuid(id);
      const { isInputsValid, message } = validateInputs({
        desig_ecra: input.desig_ecra,
        desig_tecla_seleccao: input.desig_tecla_seleccao,
      });

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
            id,
          },
          data: {
            desig_ecra: input.desig_ecra,
            desig_tecla_seleccao: input.desig_tecla_seleccao,
            carregamento: {
              update: {
                data: {
                  desig_referencia: input.carregamento.desig_referencia,
                  tamanho_referencia: input.carregamento.tamanho_referencia,
                  texto_ecra_referencia:
                    input.carregamento.texto_ecra_referencia,
                  montante_tipo: input.carregamento.montante_tipo,
                  montante_maximo: input.carregamento.montante_maximo,
                  montante_minimo: input.carregamento.montante_minimo,
                  montantes: {
                    updateMany: {
                      where: {
                        id: {
                          in: input.carregamento.montantes.map((m) => m.id),
                        },
                        carregamentoId: input.carregamento.id,
                      },
                      data: input.carregamento.montantes,
                    },
                  },
                },
              },
            },
          },
        });

        revalidatePath("/multicaixa", "page");

        return {
          status: 200,
          message: "Produto Carregamento actualizado",
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
          recargas: {
            include: {
              montantes: true,
            },
          },
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
        include: {
          carregamento: true,
          pagamento: true,
          recargas: {
            include: {
              montantes: true,
            },
          },
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
