import { useState } from "react";
import { useEndStore } from "@/context/mcx";

export const useMcxEndViewReferenciaData = () => {
  const { setReferencia } = useEndStore();
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
  const { setMontante } = useEndStore();
  const [montanteValue, setMontanteValue] = useState("");

  const onMontanteValueChange = (value: string) => {
    setMontanteValue(value);
    setMontante(value);
  };

  return {
    montanteValue,
    onMontanteValueChange,
  };
};

export const useMcxEndViewUnidadesData = () => {
  const { setUnidades, setMontante } = useEndStore();

  const setRecargasValues = (
    unidades: string | undefined,
    montante: string
  ) => {
    setUnidades(unidades);
    setMontante(montante);
  };

  return { setRecargasValues };
};
