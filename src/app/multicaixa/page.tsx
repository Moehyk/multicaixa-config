import { api } from "@/server";

export default async function MulticaixaPage() {
  const { data: entidades } = await api.entidade.getAll();

  return (
    <div>
      {entidades?.map((e) => (
        <div key={e.id}>
          <div>{e.screenName}</div>
          <div>{e.id}</div>
        </div>
      ))}
    </div>
  );
}
