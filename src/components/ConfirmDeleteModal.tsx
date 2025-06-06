import { useFormMutation } from "@/hooks";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { confirmDeleteConfig } from "@/config";

import { Button } from "@mantine/core";

import type { ContextModalProps } from "@mantine/modals";
import type { DataModel, DeleteHandler, BaseApiResponse } from "@/types";

interface InnerProps<T extends BaseApiResponse = BaseApiResponse> {
  onDelete: DeleteHandler<T>;
  dataId: string;
  model: DataModel;
}

export default function ConfirmDeleteModal({
  id,
  context,
  innerProps: { dataId, model, onDelete },
}: ContextModalProps<InnerProps>) {
  const { isMutating, setIsFetching } = useFormMutation();

  const handleDelete = async () => {
    setIsFetching(true);
    const response = await onDelete(dataId);
    console.log("response", response.data);
    setIsFetching(false);

    if (response.status !== 200) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      context.closeModal(id);
    }
  };

  return (
    <>
      <p>{confirmDeleteConfig[model]}</p>
      <p>ID: {dataId}</p>
      <div className="flex gap-4 justify-end mt-8">
        <Button variant="default" onClick={() => context.closeModal(id)}>
          Cancelar
        </Button>
        <Button color="red" loading={isMutating} onClick={handleDelete}>
          Apagar
        </Button>
      </div>
    </>
  );
}
