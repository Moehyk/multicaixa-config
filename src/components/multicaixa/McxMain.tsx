import NoMcxGrid from "./NoMcxGrid";
import McxGrid from "./McxGrid";

import type { GridButton, DataModel } from "@/types";

export default function McxMain({
  buttons,
  header,
  dataModel,
}: {
  header: string | undefined;
  buttons: GridButton[] | undefined;
  dataModel: DataModel;
}) {
  return (
    <div className="px-16 py-8 flex items-center justify-center">
      {(!buttons || buttons.length === 0) && (
        <NoMcxGrid dataModel={dataModel} />
      )}
      {buttons && buttons.length > 0 && <McxGrid buttons={buttons} />}
    </div>
  );
}
