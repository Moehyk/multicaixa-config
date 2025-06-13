import { useEffect, useState } from "react";
import { useMulticaixaController } from "@/context/multicaixa-controller";
import { splitArray } from "@/utils/split-array";

import McxSelectBtn from "./McxSelectBtn";

import type { GridButton, GroupButtons, DataModel } from "@/types";

const viewController = (state: {
  view: DataModel;
  desigEcra: string;
  ecraSecondary?: string;
  servicoId?: string;
  produtoId?: string;
  carregamentoId?: string;
  recargasId?: string;
}) => {
  const selectView: { [key: string]: DataModel } = {
    empresa: "servico",
    servico: "produto",
  };

  useMulticaixaController.setState({
    ...state,
    view: selectView[state.view],
  });
};

function OnlyOneGroup({ buttons, dataModel }: GroupButtons) {
  return (
    <>
      {buttons.map((btn, i) => (
        <McxSelectBtn
          key={`${btn.id}-${btn.selectText}`}
          selectText={btn.selectText}
          selectSecondarytext={btn.selectSecondarytext}
          selectKey={`${i + 1}`}
          clickHandler={() =>
            viewController({
              view: dataModel,
              desigEcra: btn.screenText,
              ecraSecondary: btn.subtitle,
              servicoId: dataModel === "servico" ? btn.id : undefined,
              produtoId: dataModel === "produto" ? btn.id : undefined,
              carregamentoId: dataModel === "carregamento" ? btn.id : undefined,
              recargasId: dataModel === "recarga" ? btn.id : undefined,
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
              key={`${btn.id}-${btn.selectText}`}
              selectText={btn.selectText}
              selectSecondarytext={btn.selectSecondarytext}
              selectKey={`${i + 1}`}
              clickHandler={() =>
                viewController({
                  view: dataModel,
                  desigEcra: btn.screenText,
                  ecraSecondary: btn.subtitle,
                  servicoId: dataModel === "servico" ? btn.id : undefined,
                  produtoId: dataModel === "produto" ? btn.id : undefined,
                  carregamentoId:
                    dataModel === "carregamento" ? btn.id : undefined,
                  recargasId: dataModel === "recarga" ? btn.id : undefined,
                })
              }
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
              clickHandler={() =>
                viewController({
                  view: dataModel,
                  desigEcra: btn.screenText,
                  ecraSecondary: btn.subtitle,
                  servicoId: dataModel === "servico" ? btn.id : undefined,
                  produtoId: dataModel === "produto" ? btn.id : undefined,
                  carregamentoId:
                    dataModel === "carregamento" ? btn.id : undefined,
                  recargasId: dataModel === "recarga" ? btn.id : undefined,
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
          clickHandler={() =>
            viewController({
              view: dataModel,
              desigEcra: btn.screenText,
              ecraSecondary: btn.subtitle,
              servicoId: dataModel === "servico" ? btn.id : undefined,
              produtoId: dataModel === "produto" ? btn.id : undefined,
              carregamentoId: dataModel === "carregamento" ? btn.id : undefined,
              recargasId: dataModel === "recarga" ? btn.id : undefined,
            })
          }
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
