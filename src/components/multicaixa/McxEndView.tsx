import { modals } from "@mantine/modals";
import { useMcxData } from "@/hooks/useMcxData";
import { useResetMcx } from "@/hooks/useResetMcx";
import { useMcxTrigger } from "@/hooks/useMcxTrigger";
import { useEndViewStore } from "@/context/mcx";
import { amountFractionFormatter } from "@/utils/amount-formatter";

import McxScreenText from "./McxScreenText";
import McxSelectBtn from "./McxSelectBtn";

function DadosConfirmados({
  data,
  title,
}: {
  data: string | undefined;
  title: string;
}) {
  return (
    <p className="flex justify-between font-medium text-xl">
      <span>{`${title}:`}</span>
      <span>{data}</span>
    </p>
  );
}

export default function McxEndView() {
  const { produto } = useMcxData();
  const { montante, referencia, unidades } = useEndViewStore();
  const reset = useResetMcx();

  return (
    <>
      <McxScreenText subtext={produto?.desigEcra} />
      <div className="flex flex-col w-full h-full items-center justify-between px-16 pb-8 pt-16">
        <div className="bg-brand-900 rounded-lg p-14 flex gap-4 flex-col text-white text-center">
          <p className="text-2xl font-semibold mb-4">
            Confirme os dados do Serviço:
          </p>
          <DadosConfirmados
            title={referencia ? "Referência" : "Unidades"}
            data={referencia ?? unidades}
          />
          <DadosConfirmados
            title="Montante"
            data={amountFractionFormatter(Number(montante))}
          />
        </div>
        <div className="w-full flex gap-8 justify-between">
          <McxSelectBtn onClick={reset} selectText="Cancelar" selectKey="1" />
          <McxSelectBtn onClick={reset} selectText="Confirmar" selectKey="2" />
        </div>
      </div>
    </>
  );
}
