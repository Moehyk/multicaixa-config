"use client";
import { useState } from "react";

import Link from "next/link";
import { TextInput, NumberInput, Button, Fieldset } from "@mantine/core";

export default function CreateRecargasForm({}: { servicoId: string }) {
  const [qty, setQty] = useState<number>(1);

  return (
    <form className="pt-12">
      <div className="flex w-full  gap-4">
        <TextInput label="Designação p/ ecrã" className="flex-1" />
        <TextInput label="Designação p/ tecla de selecção" className="flex-1" />
        <TextInput
          label="Designação p/ Unidades"
          className="flex-1"
          maxLength={15}
        />
        <NumberInput
          className="w-1/6"
          value={qty}
          onChange={(value) => setQty(Number(value))}
          label="Nº de unidades"
          allowNegative={false}
          max={8}
          min={1}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-auto gap-4">
        {Array.from({ length: qty }, (_, i) => (
          <Fieldset
            legend={`Recarga ${i + 1}`}
            key={i}
            className="flex gap-4 border border-border p-4"
          >
            <NumberInput
              className="flex-1"
              label="Quantidade"
              suffix=" Kzs"
              allowNegative={false}
              thousandSeparator=","
              fixedDecimalScale
              decimalScale={2}
              max={99999999.99}
              min={0}
              style={{
                height: "auto",
              }}
            />
            <NumberInput
              className="flex-1"
              label="Montante"
              suffix=" Kzs"
              allowNegative={false}
              thousandSeparator=","
              fixedDecimalScale
              decimalScale={2}
              max={99999999.99}
              min={0}
            />
          </Fieldset>
        ))}
      </div>
      <div className="flex gap-2 pt-8">
        <Button component={Link} href="/multicaixa" variant="default" size="md">
          Voltar
        </Button>
        <Button size="md" type="submit">
          Criar
        </Button>
      </div>
    </form>
  );
}
