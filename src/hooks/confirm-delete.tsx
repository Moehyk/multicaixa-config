"use client";

import { useFormMutation } from "@/hooks/forms";
import { errorNotification, sucessNotification } from "@/utils/notifications";
import { confirmDeleteConfig } from "@/config";

import type { ContextModalProps } from "@mantine/modals";
import type { ConfirmDeleteProps } from "@/types";

export const useConfirmDelete = (
  props: ContextModalProps<ConfirmDeleteProps>
) => {
  const { isMutating, setIsFetching } = useFormMutation();
  const modalHeaderText = confirmDeleteConfig[props.innerProps.model];

  const closeModal = () => props.context.closeModal(props.id);

  const handleDelete = async () => {
    const { onDelete, dataId } = props.innerProps;

    setIsFetching(true);
    const response = await onDelete(dataId);
    setIsFetching(false);

    if (response.status !== 200) {
      errorNotification(response);
    } else {
      sucessNotification(response);
      closeModal();
    }
  };

  return { isMutating, modalHeaderText, handleDelete, closeModal };
};
