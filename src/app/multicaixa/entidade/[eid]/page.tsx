import { api } from "@/server";

import { UrlParams } from "@/types";

export default async function EntidadePage({
  params,
}: {
  params: Promise<UrlParams>;
}) {
  const { eid } = await params;

  const { data: entidade } = await api.entidade.get(eid);
  const { data: servicos } = await api.servico.getAll(eid);

  return (
    <div>
      <div>{entidade?.screenName}</div>
      <div>
        {servicos?.map((s) => (
          <div key={s.id}>
            <a
              href={`/multicaixa/entidade/${eid}/servico/${s.id}`}
              className="text-blue-500"
            >
              {s.screenName}
            </a>
            <div>{s.selectionName_1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
