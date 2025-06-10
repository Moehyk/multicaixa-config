export const checkIfQueryParamsIsValid = (params: Record<string, string>) =>
  Object.values(params).every((value) => {
    if (value === null) {
      return false;
    }
    return true;
  });

export const getInvalidParamsMessage = (params: Record<string, string>) => {
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

export const isValidCuid = (id: string): boolean => {
  // Basic regex for CUID (v2) validation
  const cuidRegex = /^c[^\s-]{8,}$/i;
  return cuidRegex.test(id);
};
