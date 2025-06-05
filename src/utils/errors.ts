import { Prisma } from "@prisma/client";
import type { DataModel } from "@/types";

const checkIfQueryParamsIsValid = (params: Record<string, string>) =>
  Object.values(params).every((value) => {
    if (value === null) {
      return false;
    }
    return true;
  });

const getInvalidParamsMessage = (params: Record<string, string>) => {
  const invalidParams: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      invalidParams.push(key);
    }
  }

  if (invalidParams.length === 0) {
    invalidParams.push("nenhum");
  }

  return `os seguintes parâmetros não foram submetidos: ${invalidParams.join(
    ", "
  )}`;
};

const processValidationError = (
  input: Record<string, string>,
  error: unknown
) => {
  const message = getInvalidParamsMessage(input);

  return {
    status: 400,
    message,
    error: error instanceof Error ? error.message : "Erro desconhecido",
    // Include stack only in development
    ...(process.env.NODE_ENV === "development" && {
      debug: error instanceof Error ? error.stack : undefined,
    }),
  };
};

const processInvalidIdError = (data: DataModel, error: unknown) => {
  return {
    status: 400,
    message: `${data}Id inválido`,
    error: error instanceof Error ? error.message : "Erro desconhecido",
    // Include stack only in development
    ...(process.env.NODE_ENV === "development" && {
      debug: error instanceof Error ? error.stack : undefined,
    }),
    data: null,
  };
};

const processError500 = (error: unknown) => {
  if (error instanceof Error) {
    console.error("Error Stack:", error.stack);
    console.error("Error Details:", {
      message: error.message,
      name: error.name,
      cause: error.cause,
    });

    // For Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma Error Code:", error.code);
      console.error("Prisma Meta:", error.meta);
    }
  } else {
    console.error("Unknown Error Type:", error);
  }

  return {
    status: 500,
    message: "Ocorreu um erro ao processar sua solicitação",
    error: error instanceof Error ? error.message : "Erro desconhecido",
    // Include stack only in development
    ...(process.env.NODE_ENV === "development" && {
      debug: error instanceof Error ? error.stack : undefined,
    }),
    data: null,
  };
};

export const processCreateUpdateError = (
  input: Record<string, any>,
  error: unknown
) => {
  const isValid = checkIfQueryParamsIsValid(input);

  if (!isValid) {
    return processValidationError(input, error);
  } else {
    return processError500(error);
  }
};

export const processGetDeleteError = (
  id: string,
  data: DataModel,
  error: unknown
) => {
  if (id) {
    return processInvalidIdError(data, error);
  } else {
    return processError500(error);
  }
};
