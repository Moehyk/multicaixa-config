import type { DataModel } from "@/types";

export default function McxHeader({
  dataModel,
  title,
}: {
  title: string | undefined;
  dataModel: DataModel;
}) {
  const subHeader: { [key: string]: string } = {
    servico: "escolha um serviço",
    produto: "escolha um produto",
  };

  return (
    <div className="text-center uppercase text-white flex-1 pt-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      <h2 className="text-2xl font-medium mt-4">{subHeader[dataModel]}</h2>
    </div>
  );
}
