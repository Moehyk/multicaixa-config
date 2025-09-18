"use client";
import { useResetMcx } from "@/hooks/reset-mcx";

import McxInputs from "./McxInputs";
import { Button } from "@mantine/core";

function Title({ title }: { title: string }) {
  return (
    <div className="text-white font-bold mt-20 mb-5 text-2xl">{title}</div>
  );
}

function Text({ text }: { text: string }) {
  return (
    <p className="text-white text-xl font-medium pt-4 w-4/5 text-center">
      {text}
    </p>
  );
}

export default function McxInputsView({
  children,
  onClear,
  onContinue,
}: {
  children: React.ReactNode;
  onContinue: () => void;
  onClear: () => void;
}) {
  const reset = useResetMcx();

  return (
    <div className="flex flex-col w-4/5 h-full justify-between mx-auto pb-8">
      <div className="flex flex-col items-center">{children}</div>
      <div className="flex gap-2 justify-end">
        <Button size="xl" color="red" onClick={reset}>
          Anular
        </Button>
        <Button size="xl" color="yellow" onClick={onClear}>
          Corrigir
        </Button>
        <Button size="xl" color="green" onClick={onContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}

McxInputsView.Title = Title;
McxInputsView.Text = Text;
McxInputsView.Inputs = McxInputs;
