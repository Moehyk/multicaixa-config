"use client";

import { useState } from "react";

import McxPagamentoInput from "./McxPagamentoInput";
import { Button } from "@mantine/core";

import type { PagamentoData, CustomInputValueType } from "@/types";

function renderScreens(options: {
  title?: string;
  valueLength: number;
  value: string;
  valueType: CustomInputValueType;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <div className="text-white font-bold mt-20 mb-5 text-2xl">
        {options.title}
      </div>
      <div className="bg-brand-900 w-full  mb-4 py-12 rounded flex flex-col items-center">
        <div className="flex flex-col items-stretch">
          <McxPagamentoInput
            value={options.value}
            valueLength={options.valueLength}
            onChange={options.setValue}
            valueType={options.valueType}
          />
        </div>
      </div>
    </>
  );
}

export default function McxPagamento({
  desigReferencia,
  tamanhoReferencia,
  textoEcraReferencia,
}: NonNullable<PagamentoData>) {
  const [screen, setScreen] = useState<1 | 2>(1);
  const [referenciaValue, setReferenciaValue] = useState("");
  const [montanteValue, setMontanteValue] = useState("");

  return (
    <div className="flex flex-col w-4/5 h-full justify-between mx-auto pb-8">
      <div className="flex flex-col items-center">
        <>
          {screen === 1 &&
            renderScreens({
              setValue: setReferenciaValue,
              value: referenciaValue,
              valueLength: tamanhoReferencia,
              valueType: "REFERENCIA",
              title: desigReferencia,
            })}
          {screen === 2 &&
            renderScreens({
              setValue: setMontanteValue,
              value: montanteValue,
              valueLength: 10,
              valueType: "MONTANTE",
              title: "Introduza o Montante Pretendido",
            })}
        </>
        <p className="text-white text-xl font-medium pt-4 w-4/5 text-center">
          {textoEcraReferencia}
        </p>
      </div>
      <div className="flex gap-2 justify-end">
        <Button size="xl" color="red">
          Cancelar
        </Button>
        {screen === 1 && (
          <Button size="xl" color="green" onClick={() => setScreen(2)}>
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
}
