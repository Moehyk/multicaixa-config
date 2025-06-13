import NoMcxView from "./NoMcxView";
import McxSelectionView from "./McxSelectionView";

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
  return <McxSelectionView buttons={buttons} dataModel={dataModel} />;
}
