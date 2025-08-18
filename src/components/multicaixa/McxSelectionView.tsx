"use client";

import { useEffect, useState } from "react";
import { useViewStore } from "@/context/mcx";
import { splitArray } from "@/utils/split-array";

import McxContentWrapper from "./McxContentWrapper";
import McxSelectBtn from "./McxSelectBtn";

import type { GridButton, GroupButtons, Views } from "@/types";

function OnlyOneGroup({ buttons, to }: GroupButtons) {
  return (
    <>
      {buttons.map((btn, i) => (
        <McxSelectBtn
          key={`${btn.id}-${btn.selectText}`}
          selectText={btn.selectText}
          selectSecondarytext={btn.selectSecondarytext}
          selectKey={`${i + 1}`}
          clickHandler={() => to(btn.id)}
        />
      ))}
    </>
  );
}

function MultiGroupFirstOrLastPage({
  buttons,
  currentPage,
  dispatch,
  to,
}: GroupButtons) {
  return (
    <>
      {currentPage === 1 && (
        <>
          {buttons.map((btn, i) => (
            <McxSelectBtn
              key={`${btn.id}-${btn.selectText}`}
              selectText={btn.selectText}
              selectSecondarytext={btn.selectSecondarytext}
              selectKey={`${i + 1}`}
              clickHandler={() => to(btn.id)}
            />
          ))}
          <McxSelectBtn
            selectText="Ecrã Seguinte"
            selectKey="8"
            clickHandler={() => dispatch(currentPage + 1)}
          />
        </>
      )}
      {currentPage !== 1 && (
        <>
          <McxSelectBtn
            selectText="Ecrã Anterior"
            selectKey="1"
            clickHandler={() => dispatch(currentPage - 1)}
          />
          {buttons.map((btn, i) => (
            <McxSelectBtn
              key={`${btn.id}-${btn.selectText}`}
              selectText={btn.selectText}
              selectSecondarytext={btn.selectSecondarytext}
              selectKey={`${i + 2}`}
              clickHandler={() => to(btn.id)}
            />
          ))}
        </>
      )}
    </>
  );
}

function MultiGroupBetweenPage({
  buttons,
  currentPage,
  dispatch,
  lastPage,
  to,
}: GroupButtons) {
  return (
    <>
      <McxSelectBtn
        selectText="Ecrã Anterior"
        selectKey="1"
        clickHandler={() => dispatch(currentPage - 1)}
      />
      {buttons.map((btn, i) => (
        <McxSelectBtn
          key={`${btn.id}-${btn.selectText}`}
          selectText={btn.selectText}
          selectSecondarytext={btn.selectSecondarytext}
          selectKey={`${i + 2}`}
          clickHandler={() => to(btn.id)}
        />
      ))}
      {currentPage !== lastPage && (
        <McxSelectBtn
          selectText="Ecrã Seguinte"
          selectKey="8"
          clickHandler={() => dispatch(currentPage + 1)}
        />
      )}
    </>
  );
}

export default function McxSelectionView({
  buttons,
  isDefault,
  target,
}: {
  buttons: GridButton[];
  isDefault?: boolean;
  target: Views;
}) {
  const { setView } = useViewStore();

  const splitButtons = splitArray(buttons, 7, 6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBtns, setPageBtns] = useState<GridButton[]>(
    splitButtons[currentPage - 1]
  );

  const goTo = (id?: string) => {
    console.log("id", id);
    setView(target, id);
  };

  useEffect(() => {
    setPageBtns(splitButtons[currentPage - 1]);
  }, [currentPage]);

  return (
    <McxContentWrapper>
      <div className="w-full grid grid-cols-2 gap-8">
        {buttons.length < 9 && pageBtns.length <= 8 && (
          <OnlyOneGroup
            buttons={pageBtns}
            currentPage={currentPage}
            dispatch={setCurrentPage}
            to={goTo}
          />
        )}
        {buttons.length >= 9 && (
          <>
            {pageBtns.length > 6 && (
              <MultiGroupFirstOrLastPage
                buttons={pageBtns}
                currentPage={currentPage}
                dispatch={setCurrentPage}
                to={goTo}
              />
            )}
            {pageBtns.length <= 6 && (
              <MultiGroupBetweenPage
                buttons={pageBtns}
                currentPage={currentPage}
                dispatch={setCurrentPage}
                lastPage={splitButtons.length}
                to={goTo}
              />
            )}
          </>
        )}
      </div>
    </McxContentWrapper>
  );
}
