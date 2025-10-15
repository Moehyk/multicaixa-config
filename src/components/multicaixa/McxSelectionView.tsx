"use client";

import { randomId } from "@mantine/hooks";
import { useMcxSelectionButtons } from "@/hooks/mcx-selection-view";

import McxContentWrapper from "./McxContentWrapper";
import McxSelectBtn from "./McxSelectBtn";

import type { McxSelectionViewProps } from "@/types";

export default function McxSelectionView(props: McxSelectionViewProps) {
  const {
    setCurrentGroup,
    currentButtons,
    hasPreviousPageBtn,
    hasNextPageBtn,
    navigate,
  } = useMcxSelectionButtons(props);

  return (
    <McxContentWrapper>
      <div className="w-full grid grid-cols-2 gap-8">
        {hasPreviousPageBtn && (
          <McxSelectBtn
            key={randomId("mcx-select-btn")}
            selectText="Ecrã Anterior"
            selectKey="1"
            onClick={() => setCurrentGroup((s) => s - 1)}
          />
        )}
        {currentButtons.map((btn, i) => (
          <McxSelectBtn
            key={randomId("mcx-select-btn")}
            selectText={btn.selectText}
            selectSecondarytext={btn.selectSecondarytext}
            selectKey={`${hasPreviousPageBtn ? i + 2 : i + 1}`}
            onClick={() => navigate(btn)}
          />
        ))}
        {hasNextPageBtn && (
          <McxSelectBtn
            key={randomId("mcx-select-btn")}
            selectText="Ecrã Seguinte"
            selectKey="8"
            onClick={() => setCurrentGroup((s) => s + 1)}
          />
        )}
      </div>
    </McxContentWrapper>
  );
}
