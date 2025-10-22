export const renderServicoNomeParam = (
  param: string | string[] | undefined
) => {
  if (typeof param === "string") {
    param.replaceAll("%", " ");

    return param.replaceAll("%", " ");
  }

  return "Editar Produto";
};
