import { mcxEmpresaStore, useViewsStore } from "@/context/mcx";

export const useMcxData = () => {
  const { id } = useViewsStore();
  const { getServico, getProduto } = mcxEmpresaStore();

  const servico = getServico(id);
  const produto = getProduto(id);

  return { servico, produto };
};
