import { useState } from "react";
import { useEndViewStore } from "@/context/mcx";

export const useMcxEndViewReferenciaData = () => {
  const { setReferencia } = useEndViewStore();
  const [referenciaValue, setReferenciaValue] = useState("");

  const onReferenciaValueChange = (value: string) => {
    setReferenciaValue(value);
    setReferencia(value);
  };

  return {
    referenciaValue,
    onReferenciaValueChange,
  };
};

export const useMcxEndViewMontanteData = () => {
  const { setMontante } = useEndViewStore();
  const [montanteValue, setMontanteValue] = useState("");

  const onMontanteValueChange = (value: string) => {
    setMontanteValue(value);
    setMontante(`${value} Kzs`);
  };

  return {
    montanteValue,
    onMontanteValueChange,
  };
};

export const useMcxEndViewUnidadesData = () => {
  const { setUnidades, setMontante } = useEndViewStore();

  const setRecargasValues = (
    unidades: string | undefined,
    montante: string
  ) => {
    setUnidades(unidades);
    setMontante(montante);
  };

  return { setRecargasValues };
};
