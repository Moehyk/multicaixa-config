import { useMulticaixaController } from "@/context/multicaixa-controller";

export default function McxHeader() {
  const { desigEcra, ecraSecondary } = useMulticaixaController();

  return (
    <div className="text-center uppercase text-white flex-1 pt-8">
      <h1 className="text-4xl font-bold">{desigEcra}</h1>
      <h2 className="text-2xl font-medium mt-4">{ecraSecondary}</h2>
    </div>
  );
}
