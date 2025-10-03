"use client";

import { useConfirmDelete } from "@/hooks/confirm-delete";

import { Button } from "@mantine/core";

import type { ContextModalProps } from "@mantine/modals";
import type { ConfirmDeleteProps } from "@/types";

export default function ConfirmDeleteModal(
  props: ContextModalProps<ConfirmDeleteProps>
) {
  const { isMutating, modalHeaderText, handleDelete, closeModal } =
    useConfirmDelete(props);

  return (
    <>
      <p className="font-medium">{modalHeaderText}</p>
      <div className="flex gap-4 justify-end mt-8">
        <Button variant="default" onClick={closeModal}>
          Cancelar
        </Button>
        <Button color="red" loading={isMutating} onClick={handleDelete}>
          Apagar
        </Button>
      </div>
    </>
  );
}
