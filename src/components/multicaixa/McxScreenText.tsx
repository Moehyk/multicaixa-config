"use client";

import { useSearchParams } from "next/navigation";
import { useMcxData } from "@/hooks/mcx-data";

export default function McxScreenText({ subtext }: { subtext?: string }) {
  const { empresa } = useMcxData();
  const empresaDesigEcra = useSearchParams().get("e") || "[MINHA EMPRESA]";

  return (
    <div className="text-center uppercase text-white flex-1 pt-8">
      <h1 className="text-4xl font-bold">
        {empresa ? empresa.desigEcra : empresaDesigEcra}
      </h1>
      <h2 className="text-2xl font-medium mt-4">{subtext}</h2>
    </div>
  );
}
