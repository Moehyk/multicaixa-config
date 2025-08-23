"use client";

import { useState, useEffect } from "react";
import { sortDataArray } from "@/utils/sort-data-array";

import McxSelectionView from "./McxSelectionView";
import McxSelectBtn from "./McxSelectBtn";

import type { CarregamentoBoth, GridButton } from "@/types";

export default function McxCarregamentoBoth({
  montantes,
  ...props
}: CarregamentoBoth) {
  const [mode, setMode] = useState<"PRE" | "FREE">("PRE");

  useEffect(() => {
    return () => setMode("PRE");
  }, []);

  const buttons: GridButton[] = sortDataArray(montantes).map<GridButton>(
    (m) => ({
      id: m.id,
      produtoTipo: "carregamentos",
      selectText: `${m.montante.toString()} KZS`,
      selectSecondarytext: `${m.descricao}`,
    })
  );

  return (
    <>
      {mode === "PRE" && (
        <>
          <McxSelectionView buttons={buttons} target="end" />
          <McxSelectBtn
            selectText="Outros Montantes"
            selectKey={`${buttons.length + 1}`}
            clickHandler={() => setMode("FREE")}
          />
        </>
      )}
    </>
  );
}
