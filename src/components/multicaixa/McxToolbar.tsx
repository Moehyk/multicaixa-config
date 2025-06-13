import { modals } from "@mantine/modals";
import { useMulticaixaController } from "@/context/multicaixa-controller";

import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function McxToolbar({ title }: { title: string }) {
  const { view } = useMulticaixaController();

  return (
    <div className="flex justify-end p-2">
      <div className="flex gap-2">
        {view !== "empresa" && (
          <Button
            size="compact-sm"
            color="cyan"
            leftSection={<IconX size={16} />}
            onClick={() =>
              useMulticaixaController.setState({
                desigEcra: title,
                ecraSecondary: "Escolha um serviço",
                view: "empresa",
                carregamentoId: undefined,
                recargasId: undefined,
                produtoId: undefined,
                servicoId: undefined,
              })
            }
          >
            Reset
          </Button>
        )}
        <Button
          size="compact-sm"
          color="orange"
          leftSection={<IconX size={16} />}
          onClick={() => modals.closeAll()}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
