import { api } from "@/server";

import { UrlParams } from "@/types";

export default async function ServicoPage({
  params,
}: {
  params: Promise<UrlParams>;
}) {
  const { eid, sid } = await params;

  const { data: servico } = await api.servico.get(sid);
  const { data: produtos } = await api.produto.getAll(sid);

  return (
    <div>
      <div>{servico?.screenName}</div>
      <div>
        {produtos?.map((p) => (
          <div key={p.id}>
            <a
              href={`/multicaixa/entidade/${eid}/servico/${sid}/produto/${p.id}`}
              className="text-blue-500"
            >
              {p.screenName}
            </a>
            <div>{p.selectionName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
