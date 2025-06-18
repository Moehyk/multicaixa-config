import React from "react";

export default async function CriarProdutoPage({
  params,
}: {
  params: Promise<{ servicoId: string }>;
}) {
  const { servicoId } = await params;
  return <div>Criar Produto: {servicoId}</div>;
}
