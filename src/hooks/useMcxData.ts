import { mcxDataStore, useViewsStore } from "@/context/mcx";

export const useMcxData = () => {
  const { id } = useViewsStore();
  const { getServico, getProduto } = mcxDataStore();

  const servico = getServico(id);
  const produto = getProduto(id);

  return { servico, produto };
};
