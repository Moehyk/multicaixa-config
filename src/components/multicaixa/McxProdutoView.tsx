import { useMcxDataStore, useViewStore } from "@/context/mcx";

export default function McxProdutoView() {
  const { id } = useViewStore();

  const { getProduto } = useMcxDataStore();

  const produto = getProduto(id);

  return (
    <div>
      <p>{produto?.desigEcra}</p>
      <p>{produto?.type}</p>
    </div>
  );
}
