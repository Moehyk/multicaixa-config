import { useEffect, useState } from "react";
import { useMulticaixaController } from "@/context/multicaixa-controller";
import { splitArray } from "@/utils/split-array";

import NoMcxView from "./NoMcxView";
import McxSelectBtn from "./McxSelectBtn";

import type { GridButton, GroupButtons, DataModel } from "@/types";

function OnlyOneGroup({ buttons, dataModel }: GroupButtons) {
  return (
    <>
      {buttons.map((btn, i) => (
        <McxSelectBtn
          key={`${btn.id}-${dataModel}`}
          selectName={btn.text}
          selectKey={`${i + 1}`}
          clickHandler={() =>
            useMulticaixaController.setState({
              desigEcra: btn.text,
              ecraSecondary: `Escolha um produto`,
              view: "servico",
            })
          }
        />
      ))}
    </>
  );
}

function MultiGroupFirstOrLastPage({
  buttons,
  currentPage,
  dispatch,
  dataModel,
}: GroupButtons) {
  return (
    <>
      {currentPage === 1 && (
        <>
          {buttons.map((btn, i) => (
            <McxSelectBtn
              key={`${btn.id}-${dataModel}`}
              selectName={btn.text}
              selectKey={`${i + 1}`}
              clickHandler={() =>
                useMulticaixaController.setState({
                  desigEcra: btn.text,
                  ecraSecondary: `Escolha um produto`,
                  view: "servico",
                })
              }
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
              key={`${btn.id}-${dataModel}`}
              selectName={btn.text}
              selectKey={`${i + 2}`}
              clickHandler={() =>
                useMulticaixaController.setState({
                  desigEcra: btn.text,
                  ecraSecondary: `Escolha um produto`,
                  view: "servico",
                })
              }
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
  dataModel,
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
          key={`${btn.id}-${dataModel}`}
          selectName={btn.text}
          selectKey={`${i + 2}`}
          clickHandler={() =>
            useMulticaixaController.setState({
              desigEcra: btn.text,
              ecraSecondary: `Escolha um produto`,
              view: "servico",
            })
          }
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

function ButtonGrid({
  buttons,
  dataModel,
}: {
  buttons: GridButton[];
  dataModel: DataModel;
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
    <div className="w-full grid grid-cols-2 gap-8">
      {buttons.length < 9 && pageBtns.length <= 8 && (
        <OnlyOneGroup
          buttons={pageBtns}
          currentPage={currentPage}
          dispatch={setCurrentPage}
          dataModel={dataModel}
        />
      )}
      {buttons.length >= 9 && (
        <>
          {pageBtns.length > 6 && (
            <MultiGroupFirstOrLastPage
              buttons={pageBtns}
              currentPage={currentPage}
              dispatch={setCurrentPage}
              dataModel={dataModel}
            />
          )}
          {pageBtns.length <= 6 && (
            <MultiGroupBetweenPage
              buttons={pageBtns}
              currentPage={currentPage}
              dispatch={setCurrentPage}
              lastPage={splitButtons.length}
              dataModel={dataModel}
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
      {buttons && buttons.length > 0 && (
        <ButtonGrid buttons={buttons} dataModel={dataModel} />
      )}
    </div>
  );
}
