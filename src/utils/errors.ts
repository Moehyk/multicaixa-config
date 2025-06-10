import { getUser } from "@/server";

import { errorIdMessage } from "@/config";

import { ValidationParams } from "@/types";
import { Prisma } from "@prisma/client";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

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

export const validateCuid = (id: string): boolean => {
  // Basic regex for CUID (v2) validation
  const cuidRegex = /^c[^\s-]{8,}$/i;
  const isCuidValid = cuidRegex.test(id);

  return isCuidValid;
};

export const validateUser = async () => {
  const user = await getUser();

  return user;
};

export const validateInputs = (input: Record<string, string>) => {
  let message = "";
  const isInputsValid = checkIfQueryParamsIsValid(input);

  if (!isInputsValid) {
    message = getInvalidParamsMessage(input);
  }

  return { isInputsValid, message };
};

export const throwValidationError = (validation: ValidationParams) => {
  if (!validation.user) {
    throw new Error("Não autorizado", { cause: "erro de autenticação" });
  }
  if (!validation.cuid) {
    throw new Error(`${errorIdMessage[validation.data]}`, {
      cause: `${validation.data}Id inválido`,
    });
  }

  if (!validation.inputs) {
    throw new Error(validation.message, { cause: "parâmetros inválidos" });
  }
};

export const processErrors = (
  error: Error,
  validation: {
    cuid: boolean;
    inputs: boolean;
    user: KindeUser<Record<string, any>>;
  }
) => {
  console.error("Error Stack:", error.stack);
  console.error("Error Details:", {
    message: error.message,
    name: error.name,
    cause: error.cause,
  });

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("Prisma Error Code:", error.code);
    console.error("Prisma Meta:", error.meta);
  }

  if (!validation.cuid) {
    return {
      status: 404,
      message: error.message,
      error,
    };
  }

  if (!validation.inputs) {
    return {
      status: 400,
      message: error.message,
      error,
    };
  }

  if (!validation.user) {
    return {
      status: 403,
      message: error.message,
      error,
    };
  }
};
