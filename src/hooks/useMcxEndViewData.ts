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

export const usemcxEndViewMontanteData = () => {
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
