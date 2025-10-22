import { useMcxData } from "@/hooks/mcx-data";
import { useLocalStorage } from "@mantine/hooks";

export default function McxScreenText({ subtext }: { subtext?: string }) {
  const { empresa } = useMcxData();
  const [empresaNome] = useLocalStorage<string | null>({
    key: "empresa",
    defaultValue: null,
  });

  return (
    <div className="text-center uppercase text-white flex-1 pt-8">
      <h1 className="text-4xl font-bold">
        {empresa ? empresa.desigEcra : empresaNome}
      </h1>
      <h2 className="text-2xl font-medium mt-4">{subtext}</h2>
    </div>
  );
}
