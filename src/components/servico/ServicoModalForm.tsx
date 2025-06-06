import { upsertServico } from "@/server/actions";
import { modals } from "@mantine/modals";
import { useServicoForm, useFormMutation } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";

import { Button, TextInput } from "@mantine/core";

import type { ServicoForm } from "@/types";

export default function ServicoModalForm({
  empresaId,
  servico,
}: {
  empresaId: string;
  servico?: ServicoForm;
}) {
  const { isMutating, setIsFetching } = useFormMutation();
  const { getInputProps, onSubmit } = useServicoForm(servico);

  const handleSubmit = async (values: ServicoForm) => {
    setIsFetching(true);

    const response = await upsertServico({ empresaId, input: values });

    setIsFetching(false);
    if (response.status !== 200) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      modals.closeAll();
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <div className="flex flex-col">
        <TextInput
          {...getInputProps("desig_sistema")}
          label="Designação p/ Sistema"
        />
        <TextInput
          {...getInputProps("desig_ecra")}
          label="Designação p/ Ecrã"
        />
        <TextInput
          {...getInputProps("desig_tecla_seleccao")}
          label="Designação p/ Selecção"
        />
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          variant="default"
          onClick={() => {
            modals.closeAll();
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" loading={isMutating}>
          {servico?.id ? "Editar" : "Criar"} Serviço
        </Button>
      </div>
    </form>
  );
}
