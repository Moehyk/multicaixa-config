import { cache } from "react";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { getUser } from "../services";

import { idError, validateUser, processErrors } from "@/utils/errors";

import {
  ProdutoPagamentoForm,
  ProdutoRecargasForm,
  ProdutoCarregamentoForm,
  ProdutoData,
} from "@/types";

export const produto = {
  pagamento: {
    create: async (input: ProdutoPagamentoForm) => {
      const { data: user } = await getUser();
      const { id, servicoId, ...prodPagamentoInput } = input;

      try {
        validateUser(user);

        if (!servicoId) {
          throw idError("servico");
        }

        if (id) {
          throw new Error("Erro ao criar produto: produto já existe.");
        }

        if (!input.pagamento) {
          throw new Error(
            "Erro ao criar produto: dados do produto não equivalem ao tipo de produto pagamento."
          );
        }

        const produtoPagamento = await db.produto.create({
          data: {
            ...prodPagamentoInput,
            servicoId: servicoId,
            type: "pagamento",
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
            noId: !!servicoId,
            existentId: !!id,
            invalidInput: !!prodPagamentoInput.pagamento,
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
    update: async (input: ProdutoPagamentoForm) => {
      const { data: user } = await getUser();

      try {
        validateUser(user);

        if (!input.id) {
          throw idError("produto");
        }

        if (!input.pagamento) {
          throw new Error(
            "Erro ao criar produto: dados do produto não equivalem ao tipo de produto pagamento."
          );
        }

        const produto = await db.produto.update({
          where: {
            id: input.id,
          },
          data: {
            desigEcra: input.desigEcra,
            desigTeclaSeleccao: input.desigTeclaSeleccao,
            type: "pagamento",
            pagamento: {
              update: {
                where: {
                  id: input.pagamento.id,
                },
                data: {
                  desigReferencia: input.pagamento.desigReferencia,
                  montanteMax: input.pagamento.montanteMax,
                  montanteMin: input.pagamento.montanteMin,
                  tamanhoReferencia: input.pagamento.tamanhoReferencia,
                  textoEcraReferencia: input.pagamento.textoEcraReferencia,
                },
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
          message: "Produto Pagamento actualizado",
          data: produto,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!input.id,
            invalidInput: !!input.pagamento,
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
    create: async (input: ProdutoRecargasForm) => {
      const { data: user } = await getUser();
      const { id, servicoId, ...prodRecargasInput } = input;

      try {
        validateUser(user);

        if (!servicoId) {
          throw idError("servico");
        }

        if (id) {
          throw new Error("Erro ao criar produto: produto já existe.");
        }

        if (!prodRecargasInput.recargas) {
          throw new Error(
            "Erro ao criar produto: dados do produto não equivalem ao tipo de produto recargas."
          );
        }

        const produtoRecargas = await db.produto.create({
          data: {
            ...prodRecargasInput,
            servicoId: servicoId,
            type: "recargas",
            recargas: {
              create: {
                ...prodRecargasInput.recargas,
                montantes: {
                  createMany: {
                    data: prodRecargasInput.recargas.montantes.map((m) => ({
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
            noId: !!servicoId,
            existentId: !!id,
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
    update: async (input: ProdutoRecargasForm) => {
      const { data: user } = await getUser();

      try {
        validateUser(user);

        if (!input.id) {
          throw idError("produto");
        }

        if (!input.recargas) {
          throw new Error(
            "Erro ao actualizar produto: dados do produto não equivalem ao tipo de produto recargas."
          );
        }

        const produto = await db.produto.update({
          where: {
            id: input.id,
          },
          data: {
            desigEcra: input.desigEcra,
            desigTeclaSeleccao: input.desigTeclaSeleccao,
            type: "recargas",
            recargas: {
              update: {
                data: {
                  desigUnidade: input.recargas.desigUnidade,
                  montantes: {
                    deleteMany: {
                      id: {
                        notIn: input.recargas.montantes
                          .filter((m) => m.id) // Only consider montantes with IDs
                          .map((m) => m.id!),
                      },
                    },
                    updateMany: input.recargas.montantes
                      .filter((m) => m.id) // Only update montantes with IDs
                      .map((m) => ({
                        where: { id: m.id },
                        data: {
                          montante: m.montante,
                          quantidade: m.quantidade,
                        },
                      })),
                    create: input.recargas.montantes
                      .filter((m) => !m.id) // Only create montantes without IDs
                      .map((m) => ({
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

        return {
          status: 200,
          message: "Produto Recargas actualizado",
          data: produto,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!input.id,
            invalidInput: !!input.recargas,
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
    create: async (input: ProdutoCarregamentoForm) => {
      const { data: user } = await getUser();
      const { id, servicoId, ...prodCarregamentoInput } = input;

      try {
        validateUser(user);

        if (!servicoId) {
          throw idError("servico");
        }

        if (id) {
          throw new Error("Erro ao criar produto: produto já existe.");
        }

        if (!prodCarregamentoInput.carregamento) {
          throw new Error(
            "Erro ao criar produto: dados do produto não equivalem ao tipo de produto carregamento."
          );
        }

        const produtoCarregamento = await db.produto.create({
          data: {
            ...prodCarregamentoInput,
            servicoId: servicoId,
            type: "carregamentos",
            carregamento: {
              create: {
                ...prodCarregamentoInput.carregamento,
                montanteMin:
                  prodCarregamentoInput.carregamento.montanteTipo ===
                  "montante_pre_definido"
                    ? undefined
                    : prodCarregamentoInput.carregamento.montanteMin,
                montanteMax:
                  prodCarregamentoInput.carregamento.montanteTipo ===
                  "montante_pre_definido"
                    ? undefined
                    : prodCarregamentoInput.carregamento.montanteMax,
                montantes:
                  prodCarregamentoInput.carregamento.montanteTipo ===
                  "montante_livre"
                    ? undefined
                    : {
                        createMany: {
                          data:
                            prodCarregamentoInput.carregamento.montantes.map(
                              (m) => ({
                                montante: m.montante,
                                descricao: m.descricao,
                              })
                            ) || [],
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
            noId: !!servicoId,
            invalidInput: !!prodCarregamentoInput.carregamento,
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

    update: async (input: ProdutoCarregamentoForm) => {
      const { data: user } = await getUser();

      try {
        validateUser(user);

        if (!input.id) {
          throw idError("produto");
        }

        if (!input.carregamento) {
          throw new Error(
            "Erro ao actualizar produto: dados do produto não equivalem ao tipo de produto carregamento."
          );
        }

        const produto = await db.produto.update({
          where: {
            id: input.id,
          },
          data: {
            desigEcra: input.desigEcra,
            desigTeclaSeleccao: input.desigTeclaSeleccao,
            type: "carregamentos",
            carregamento: {
              update: {
                data: {
                  desigReferencia: input.carregamento.desigReferencia,
                  tamanhoReferencia: input.carregamento.tamanhoReferencia,
                  textoEcraReferencia: input.carregamento.textoEcraReferencia,
                  montanteTipo: input.carregamento.montanteTipo,
                  montanteMin:
                    input.carregamento.montanteTipo === "montante_pre_definido"
                      ? undefined
                      : input.carregamento.montanteMin,
                  montanteMax:
                    input.carregamento.montanteTipo === "montante_pre_definido"
                      ? undefined
                      : input.carregamento.montanteMax,
                  montantes:
                    input.carregamento.montanteTipo === "montante_livre"
                      ? undefined
                      : {
                          deleteMany: {
                            id: {
                              notIn: input.carregamento.montantes
                                .filter((m) => m.id) // Only consider montantes with IDs
                                .map((m) => m.id!),
                            },
                          },
                          updateMany: input.carregamento.montantes
                            .filter((m) => m.id) // Only update montantes with IDs
                            .map((m) => ({
                              where: { id: m.id },
                              data: {
                                montante: m.montante,
                                descricao: m.descricao,
                              },
                            })),
                          create: input.carregamento.montantes
                            .filter((m) => !m.id) // Only create montantes without IDs
                            .map((m) => ({
                              montante: m.montante,
                              descricao: m.descricao,
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
          message: "Produto Carregamento actualizado",
          data: produto,
        };
      } catch (error) {
        if (error instanceof Error) {
          const response = processErrors(error, {
            noId: !!input.id,
            invalidInput: !!input.carregamento,
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
    const { data: user } = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("produto");
      }

      const data = (await db.produto.findUnique({
        where: {
          id: id,
        },
        include: {
          servico: {
            select: {
              desigSistema: true,
            },
          },
          carregamento: {
            include: {
              montantes: true,
            },
          },
          pagamento: true,
          recargas: {
            include: {
              montantes: true,
            },
          },
        },
      })) as ProdutoData;

      return { data, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!id,
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
    const { data: user } = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("servico");
      }

      const data = (await db.produto.findMany({
        where: {
          servicoId: id,
        },
        include: {
          servico: {
            select: {
              desigSistema: true,
            },
          },
          carregamento: {
            include: {
              montantes: true,
            },
          },
          pagamento: true,
          recargas: {
            include: {
              montantes: true,
            },
          },
        },
      })) as ProdutoData[];

      return { status: 200, data };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!id,
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
    const { data: user } = await getUser();

    try {
      validateUser(user);

      if (!id) {
        throw idError("produto");
      }

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
          noId: !!id,
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
