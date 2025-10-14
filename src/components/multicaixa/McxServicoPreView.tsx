import { useMcxServicoPreview } from "@/hooks/mcx-preview";

import McxContentWrapper from "./McxContentWrapper";
import McxScreenText from "./McxScreenText";
import McxSelectBtn from "./McxSelectBtn";

export default function McxServicoPreView() {
  const { textEcra, textSeleccao, handleClick } = useMcxServicoPreview();

  return (
    <>
      <McxScreenText subtext={textEcra} />
      <McxContentWrapper>
        <div className="w-full grid grid-cols-2 gap-8">
          <McxSelectBtn
            selectKey="1"
            selectText={textSeleccao ? textSeleccao : "[Designação p/ Tecla]"}
            onClick={handleClick}
          />
        </div>
      </McxContentWrapper>
    </>
  );
}
