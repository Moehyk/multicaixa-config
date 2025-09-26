"use client";

import { useMcxInputsView } from "@/hooks/mcx-inputs-view";
import { useInputErrorsStore } from "@/context/mcx/input-errors";

import McxInputs from "./McxInputs";
import { Button } from "@mantine/core";

const renderTitleText = (
  text: string,
  refError: boolean,
  montError: boolean
) => {
  if (refError) {
    return (
      <>
        <p className="mb-2">Dados Incorrectos</p>
        <p>{text}</p>
      </>
    );
  }

  if (montError) {
    return <p>O montante introduzido está incorreto</p>;
  }

  return <p>{text}</p>;
};

function Title({ title }: { title: string }) {
  const { referenciaError, montanteError } = useInputErrorsStore();

  return (
    <div className="text-white font-bold mt-16 mb-5 text-2xl text-center h-20 flex flex-col items-center justify-center">
      {renderTitleText(title, referenciaError, montanteError)}
    </div>
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
  const reset = useMcxInputsView(onContinue, onClear);

  return (
    <div className="flex flex-col w-4/5 h-full justify-between mx-auto pb-8">
      <div className="flex flex-col items-center">{children}</div>
      <div className="flex gap-2 justify-end">
        <Button
          size="xl"
          color="red"
          onClick={reset}
          className="focus:outline-red-500"
        >
          {`Anular (Z)`}
        </Button>
        <Button
          size="xl"
          color="yellow"
          onClick={onClear}
          className="focus:outline-yellow-500"
        >
          {`Corrigir (X)`}
        </Button>
        <Button
          size="xl"
          color="green"
          onClick={onContinue}
          className="focus:outline-green-500"
        >
          {`Continuar (C)`}
        </Button>
      </div>
    </div>
  );
}

McxInputsView.Title = Title;
McxInputsView.Text = Text;
McxInputsView.Inputs = McxInputs;
