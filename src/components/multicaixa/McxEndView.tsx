import { amountFractionFormatter } from "@/utils/amount-formatter";
import { useMcxEndView } from "@/hooks/mcx-end-view";

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
  const { closeModal, montante, referencia, unidades, produto, reset } =
    useMcxEndView();

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
        <div className="w-full grid grid-cols-2 gap-8">
          <McxSelectBtn onClick={reset} selectText="Cancelar" selectKey="1" />
          <McxSelectBtn
            onClick={closeModal}
            selectText="Confirmar"
            selectKey="2"
          />
        </div>
      </div>
    </>
  );
}
