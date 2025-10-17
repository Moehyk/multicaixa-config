import { mcxEmpresaStore } from "@/context/mcx";

export default function McxScreenText({ subtext }: { subtext?: string }) {
  const { empresa } = mcxEmpresaStore();

  return (
    <div className="text-center uppercase text-white flex-1 pt-8">
      <h1 className="text-4xl font-bold">
        {empresa ? empresa.desigEcra : "[Designação Empresa]"}
      </h1>
      <h2 className="text-2xl font-medium mt-4">{subtext}</h2>
    </div>
  );
}
