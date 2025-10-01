import { useAppPreviewStore, usePreViewStore } from "@/context/mcx";

import McxContentWrapper from "./McxContentWrapper";
import McxScreenText from "./McxScreenText";
import McxSelectBtn from "./McxSelectBtn";

export default function McxPreviewServicoView() {
  const { produto } = useAppPreviewStore();
  const { setPreviewViews } = usePreViewStore();

  return (
    <>
      <McxScreenText subtext={produto.desigEcra} />
      <McxContentWrapper>
        <div className="w-full grid grid-cols-2 gap-8">
          <McxSelectBtn
            selectKey="1"
            selectText={produto.desigTeclaSeleccao}
            onClick={() => setPreviewViews("produto")}
          />
        </div>
      </McxContentWrapper>
    </>
  );
}
