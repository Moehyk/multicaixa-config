"use client";

import { randomId } from "@mantine/hooks";
import { useMcxSelectionButtons } from "@/hooks/mcx-selection-view";

import McxContentWrapper from "./McxContentWrapper";
import McxSelectBtn from "./McxSelectBtn";

import type { McxSelectionViewProps } from "@/types";

export default function McxSelectionView(props: McxSelectionViewProps) {
  const toFreeAmount = props.toFreeAmount ?? (() => {});

  const {
    setCurrentGroup,
    currentButtons,
    hasPreviousPageBtn,
    hasNextPageBtn,
    showFreeAmount,
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
            key={`${btn.id}-${btn.selectText}`}
            selectText={btn.selectText}
            selectSecondarytext={btn.selectSecondarytext}
            selectKey={`${hasPreviousPageBtn ? i + 2 : i + 1}`}
            onClick={() => navigate(btn.selectText, btn.value, btn.id)}
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
        {showFreeAmount && (
          <McxSelectBtn
            selectText="Outro Montante"
            selectKey={`${
              currentButtons.length + (hasPreviousPageBtn ? 2 : 1)
            }`}
            onClick={toFreeAmount}
          />
        )}
      </div>
    </McxContentWrapper>
  );
}
