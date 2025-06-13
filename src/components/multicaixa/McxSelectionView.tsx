import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { splitArray } from "@/utils/split-array";

import NoMcxView from "./NoMcxView";
import McxSelectBtn from "./McxSelectBtn";

import type { GridButton, GroupButtons, DataModel } from "@/types";

function OnlyOneGroup({ buttons }: GroupButtons) {
  return (
    <>
      {buttons.map((btn, i) => (
        <McxSelectBtn
          key={btn.id}
          selectName={btn.text}
          selectKey={`${i + 1}`}
          clickHandler={() => {}}
        />
      ))}
    </>
  );
}

function MultiGroupFirstOrLastPage({
  buttons,
  currentPage,
  dispatch,
}: GroupButtons) {
  return (
    <>
      {currentPage === 1 && (
        <>
          {buttons.map((btn, i) => (
            <McxSelectBtn
              key={btn.id}
              selectName={btn.text}
              selectKey={`${i + 1}`}
              clickHandler={() => {}}
            />
          ))}
          <McxSelectBtn
            selectName="Ecrã Seguinte"
            selectKey="8"
            clickHandler={() => dispatch(currentPage + 1)}
          />
        </>
      )}
      {currentPage !== 1 && (
        <>
          <McxSelectBtn
            selectName="Ecrã Anterior"
            selectKey="1"
            clickHandler={() => dispatch(currentPage - 1)}
          />
          {buttons.map((btn, i) => (
            <McxSelectBtn
              key={btn.id}
              selectName={btn.text}
              selectKey={`${i + 2}`}
              clickHandler={() => {}}
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
}: GroupButtons) {
  return (
    <>
      <McxSelectBtn
        selectName="Ecrã Anterior"
        selectKey="1"
        clickHandler={() => dispatch(currentPage - 1)}
      />
      {buttons.map((btn, i) => (
        <McxSelectBtn
          key={btn.id}
          selectName={btn.text}
          selectKey={`${i + 2}`}
          clickHandler={() => {}}
        />
      ))}
      {currentPage !== lastPage && (
        <McxSelectBtn
          selectName="Ecrã Seguinte"
          selectKey="8"
          clickHandler={() => dispatch(currentPage + 1)}
        />
      )}
    </>
  );
}

function ButtonGrid({ buttons }: { buttons: GridButton[] }) {
  const splitButtons = splitArray(buttons, 7, 6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBtns, setPageBtns] = useState<GridButton[]>(
    splitButtons[currentPage - 1]
  );

  useEffect(() => {
    setPageBtns(splitButtons[currentPage - 1]);
  }, [currentPage]);

  return (
    <div className="w-full grid grid-cols-2 gap-8">
      {buttons.length < 9 && pageBtns.length <= 8 && (
        <OnlyOneGroup
          buttons={pageBtns}
          currentPage={currentPage}
          dispatch={setCurrentPage}
        />
      )}
      {buttons.length >= 9 && (
        <>
          {pageBtns.length > 6 && (
            <MultiGroupFirstOrLastPage
              buttons={pageBtns}
              currentPage={currentPage}
              dispatch={setCurrentPage}
            />
          )}
          {pageBtns.length <= 6 && (
            <MultiGroupBetweenPage
              buttons={pageBtns}
              currentPage={currentPage}
              dispatch={setCurrentPage}
              lastPage={splitButtons.length}
            />
          )}
        </>
      )}
    </div>
  );
}

export default function McxSelectionView({
  buttons,
  dataModel,
}: {
  buttons: GridButton[] | undefined;
  dataModel: DataModel;
}) {
  return (
    <div className="px-16 py-8 flex items-center justify-center">
      {(!buttons || buttons.length === 0) && (
        <NoMcxView dataModel={dataModel} />
      )}
      {buttons && buttons.length > 0 && <ButtonGrid buttons={buttons} />}
    </div>
  );
}
