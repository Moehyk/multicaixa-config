import { useEffect, useState } from "react";
import { useMulticaixaController } from "@/context/multicaixa-controller";
import { splitArray } from "@/utils/split-array";

import McxSelectBtn from "./McxSelectBtn";

import { ProdutoTipo } from "@prisma/client";
import type { GridButton, GroupButtons, Views } from "@/types";

const viewController = (state: {
  view: Views;
  desigEcra: string;
  ecraSecondary?: string;
  servicoId?: string;
  produtoId?: string;
  carregamentoId?: string;
  pagamentoId?: string;
  recargasId?: string;
  produtoTipo?: ProdutoTipo;
}) => {
  console.log("produtoTipo", state.produtoTipo);

  const selectProdutoView: { [key: string]: Views } = {
    pagamento: "pagamento",
    carregamentos: "carregamento",
    recargas: "recarga",
  };

  useMulticaixaController.setState({
    ...state,
  });
};

function OnlyOneGroup({ buttons, view }: GroupButtons) {
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
              view: view,
              desigEcra: btn.screenText,
              ecraSecondary: btn.subtitle,
              servicoId: view === "servico" ? btn.id : undefined,
              produtoId: view === "produto" ? btn.id : undefined,
              produtoTipo: btn.produtoTipo,
              pagamentoId: btn.produtoTipo === "pagamento" ? btn.id : undefined,
              carregamentoId:
                btn.produtoTipo === "carregamentos" ? btn.id : undefined,
              recargasId: btn.produtoTipo === "recargas" ? btn.id : undefined,
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
  view,
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
                  view: view,
                  desigEcra: btn.screenText,
                  ecraSecondary: btn.subtitle,
                  servicoId: view === "servico" ? btn.id : undefined,
                  produtoId: view === "produto" ? btn.id : undefined,
                  produtoTipo: btn.produtoTipo,
                  pagamentoId:
                    btn.produtoTipo === "pagamento" ? btn.id : undefined,
                  carregamentoId:
                    btn.produtoTipo === "carregamentos" ? btn.id : undefined,
                  recargasId:
                    btn.produtoTipo === "recargas" ? btn.id : undefined,
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
                  view: view,
                  desigEcra: btn.screenText,
                  ecraSecondary: btn.subtitle,
                  servicoId: view === "servico" ? btn.id : undefined,
                  produtoId: view === "produto" ? btn.id : undefined,
                  produtoTipo: btn.produtoTipo,
                  pagamentoId:
                    btn.produtoTipo === "pagamento" ? btn.id : undefined,
                  carregamentoId:
                    btn.produtoTipo === "carregamentos" ? btn.id : undefined,
                  recargasId:
                    btn.produtoTipo === "recargas" ? btn.id : undefined,
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
  view,
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
              view: view,
              desigEcra: btn.screenText,
              ecraSecondary: btn.subtitle,
              servicoId: view === "servico" ? btn.id : undefined,
              produtoId: view === "produto" ? btn.id : undefined,
              produtoTipo: btn.produtoTipo,
              pagamentoId: btn.produtoTipo === "pagamento" ? btn.id : undefined,
              carregamentoId:
                btn.produtoTipo === "carregamentos" ? btn.id : undefined,
              recargasId: btn.produtoTipo === "recargas" ? btn.id : undefined,
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
  view,
}: {
  buttons: GridButton[];
  view: Views;
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
          view={view}
        />
      )}
      {buttons.length >= 9 && (
        <>
          {pageBtns.length > 6 && (
            <MultiGroupFirstOrLastPage
              buttons={pageBtns}
              currentPage={currentPage}
              dispatch={setCurrentPage}
              view={view}
            />
          )}
          {pageBtns.length <= 6 && (
            <MultiGroupBetweenPage
              buttons={pageBtns}
              currentPage={currentPage}
              dispatch={setCurrentPage}
              lastPage={splitButtons.length}
              view={view}
            />
          )}
        </>
      )}
    </div>
  );
}
