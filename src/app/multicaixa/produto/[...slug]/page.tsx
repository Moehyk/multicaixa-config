import React from "react";

export default async function DynamicProdutoPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.includes("criar")) {
    return <div>Criar Produto</div>;
  }

  return <div>Editar produto {slug[0]}</div>;
}
