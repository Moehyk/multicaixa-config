import { api } from "@/server";

export default async function MulticaixaPage() {
  const entidades = await api.entidade.getAll();

  return (
    <div>
      {entidades.map((e) => (
        <div key={e.id}>{e.screenName}</div>
      ))}
    </div>
  );
}
