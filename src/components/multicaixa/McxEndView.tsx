import { useMcxData } from "@/hooks/useMcxData";
import { useEndStore } from "@/context/mcx";

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
    <p className="flex justify-between font-medium">
      <span>{`${title}:`}</span>
      <span>{data}</span>
    </p>
  );
}

export default function McxEndView() {
  const { produto } = useMcxData();
  const { montante, referencia, unidades } = useEndStore();

  return (
    <>
      <McxScreenText subtext={produto?.desigEcra} />
      <div className="flex flex-col w-full h-full items-center justify-between px-16 pb-8 pt-16">
        <div className="bg-brand-900 rounded-lg p-16 flex gap-4 flex-col text-white text-center">
          <p className="text-xl font-semibold mb-4">
            Confirme os dados do Serviço:
          </p>
          <DadosConfirmados
            data={referencia ?? unidades}
            title={referencia ? "Referência" : "Unidades"}
          />
          <DadosConfirmados data={montante} title="Montante" />
        </div>
        <div className="w-full flex gap-8 justify-between">
          <McxSelectBtn
            clickHandler={() => {}}
            selectText="Cancelar"
            selectKey="1"
          />
          <McxSelectBtn
            clickHandler={() => {}}
            selectText="Confirmar"
            selectKey="2"
          />
        </div>
      </div>
    </>
  );
}
