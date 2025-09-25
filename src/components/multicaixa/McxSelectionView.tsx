"use client";

import { useEffect, useState } from "react";
import { useMcxNavigation } from "@/hooks/useMcxNavigation";
import { splitArray } from "@/utils/split-array";

import McxContentWrapper from "./McxContentWrapper";
import McxSelectBtn from "./McxSelectBtn";

import type { GridButton, GroupButtonsProps, Views } from "@/types";

function OnlyOneGroup(props: GroupButtonsProps) {
  const onClick = useMcxNavigation(props);

  return (
    <>
      {props.buttons.map((btn, i) => (
        <McxSelectBtn
          key={`${btn.id}-${btn.selectText}`}
          selectText={btn.selectText}
          selectSecondarytext={btn.selectSecondarytext}
          selectKey={`${i + 1}`}
          onClick={() => onClick(btn.selectText, btn.value, btn.id)}
        />
      ))}
      {props.isFreeAmount && (
        <McxSelectBtn
          selectText="Outro Montante"
          selectKey={`${props.buttons.length + 1}`}
          onClick={props.toFreeAmount}
        />
      )}
    </>
  );
}

function MultiGroupFirstOrLastPage(props: GroupButtonsProps) {
  const onClick = useMcxNavigation(props);

  return (
    <>
      {props.currentPage === 1 && (
        <>
          {props.buttons.map((btn, i) => (
            <McxSelectBtn
              key={`${btn.id}-${btn.selectText}`}
              selectText={btn.selectText}
              selectSecondarytext={btn.selectSecondarytext}
              selectKey={`${i + 1}`}
              onClick={() => onClick(btn.selectText, btn.value, btn.id)}
            />
          ))}
          <McxSelectBtn
            selectText="Ecrã Seguinte"
            selectKey="8"
            onClick={() => props.dispatch(props.currentPage + 1)}
          />
        </>
      )}
      {props.currentPage !== 1 && (
        <>
          <McxSelectBtn
            selectText="Ecrã Anterior"
            selectKey="1"
            onClick={() => props.dispatch(props.currentPage - 1)}
          />
          {props.buttons.map((btn, i) => (
            <McxSelectBtn
              key={`${btn.id}-${btn.selectText}`}
              selectText={btn.selectText}
              selectSecondarytext={btn.selectSecondarytext}
              selectKey={`${i + 2}`}
              onClick={() => onClick(btn.selectText, btn.value, btn.id)}
            />
          ))}
        </>
      )}
    </>
  );
}

function MultiGroupBetweenPage(props: GroupButtonsProps) {
  const onClick = useMcxNavigation(props);

  return (
    <>
      <McxSelectBtn
        selectText="Ecrã Anterior"
        selectKey="1"
        onClick={() => props.dispatch(props.currentPage - 1)}
      />
      {props.buttons.map((btn, i) => (
        <McxSelectBtn
          key={`${btn.id}-${btn.selectText}`}
          selectText={btn.selectText}
          selectSecondarytext={btn.selectSecondarytext}
          selectKey={`${i + 2}`}
          onClick={() => onClick(btn.selectText, btn.value, btn.id)}
        />
      ))}
      {props.currentPage !== props.lastPage && (
        <McxSelectBtn
          selectText="Ecrã Seguinte"
          selectKey="8"
          onClick={() => props.dispatch(props.currentPage + 1)}
        />
      )}
    </>
  );
}

export default function McxSelectionView({
  buttons,
  target,
  hasFreeAmount,
  toFreeAmount = () => {},
}: {
  buttons: GridButton[];
  target: Views;
  hasFreeAmount?: boolean;
  toFreeAmount?: () => void;
}) {
  const splitButtons = splitArray(buttons, 7, 6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBtns, setPageBtns] = useState<GridButton[]>(
    splitButtons[currentPage - 1]
  );

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
            isFreeAmount={hasFreeAmount}
            toFreeAmount={toFreeAmount}
            target={target}
          />
        )}
        {buttons.length >= 9 && (
          <>
            {pageBtns.length > 6 && (
              <MultiGroupFirstOrLastPage
                buttons={pageBtns}
                currentPage={currentPage}
                dispatch={setCurrentPage}
                toFreeAmount={toFreeAmount}
                target={target}
              />
            )}
            {pageBtns.length <= 6 && (
              <MultiGroupBetweenPage
                buttons={pageBtns}
                currentPage={currentPage}
                dispatch={setCurrentPage}
                lastPage={splitButtons.length}
                toFreeAmount={toFreeAmount}
                target={target}
              />
            )}
          </>
        )}
      </div>
    </McxContentWrapper>
  );
}
