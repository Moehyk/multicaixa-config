import { useAppPreviewStore } from "@/context/mcx/app-preview-store";
import { openContextModal } from "@mantine/modals";

import Link from "next/link";
import { Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

import type { ProdutoCarregamentoForm } from "@/types";

function PreviewModalTrigger(values: ProdutoCarregamentoForm) {
  const handleOpenPreviewModal = () => {
    useAppPreviewStore.setState({
      produto: {
        desigEcra: values.desigEcra,
        desigTeclaSeleccao: values.desigTeclaSeleccao,
        type: "carregamentos",
        carregamento: values.carregamento!,
      },
    });

    openContextModal({
      modal: "mcx-modal",
      size: 1200,
      innerProps: {
        type: "PREVIEW",
      },
    });
  };
  return (
    <Button
      variant="outline"
      size="md"
      rightSection={<IconDeviceDesktop size={20} />}
      onClick={handleOpenPreviewModal}
    >
      Visualizar
    </Button>
  );
}

export default function FormActions({
  isSubmitting,
  previewValues,
  submitText,
}: {
  isSubmitting: boolean;
  submitText: string;
  previewValues?: ProdutoCarregamentoForm;
}) {
  return (
    <div className="flex gap-2 pt-8">
      <Button component={Link} href="/multicaixa" variant="default" size="md">
        Voltar
      </Button>
      {previewValues && <PreviewModalTrigger {...previewValues} />}
      <Button size="md" type="submit" loading={isSubmitting}>
        {submitText}
      </Button>
    </div>
  );
}
