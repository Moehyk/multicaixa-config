"use client";

import { useState } from "react";

import { PinInput, Button } from "@mantine/core";

import type { PagamentoData } from "@/types";

export default function McxPagamento({
  desigReferencia,
  tamanhoReferencia,
  textoEcraReferencia,
}: NonNullable<PagamentoData>) {
  const [screen, setScreen] = useState<1 | 2>(1);

  return (
    <div className="flex flex-col w-4/5 h-full justify-between mx-auto pb-8">
      <div className="flex flex-col items-center">
        <div className="bg-brand-900 w-full mt-20 mb-4 py-16 rounded flex flex-col items-center">
          {screen === 1 && (
            <div className="flex flex-col items-stretch">
              <label className="text-white font-bold mb-1">
                {desigReferencia}
              </label>
              <PinInput
                length={tamanhoReferencia}
                inputType="number"
                placeholder=""
                gap={4}
                size="lg"
              />
            </div>
          )}
        </div>
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
