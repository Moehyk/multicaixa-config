import { useEndViewStore } from "@/context/mcx";

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
