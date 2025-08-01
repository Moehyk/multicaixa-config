import React from "react";

import { useMcxDataStore } from "@/context/mcx";

export default function McxScreenText({ subtext }: { subtext?: string }) {
  const { desigEcra } = useMcxDataStore();

  return (
    <div className="text-center uppercase text-white flex-1 pt-8">
      <h1 className="text-4xl font-bold">{desigEcra}</h1>
      <h2 className="text-2xl font-medium mt-4">{subtext}</h2>
    </div>
  );
}
