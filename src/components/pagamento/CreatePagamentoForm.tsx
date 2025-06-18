import { TextInput } from "@mantine/core";

export default function CreatePagamentoForm({
  desigEcra,
  desigSelecao,
  servicoId,
}: {
  desigEcra: string;
  desigSelecao: string;
  servicoId: string;
}) {
  return (
    <div className="py-8">
      <TextInput label="Descrição" placeholder="Descrição do produto" />
      <TextInput label="Descrição" placeholder="Descrição do produto" />
    </div>
  );
}
