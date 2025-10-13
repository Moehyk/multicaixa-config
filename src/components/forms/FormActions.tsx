import Link from "next/link";
import { Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

function PreviewModalTrigger({ openModal }: { openModal: () => void }) {
  return (
    <Button
      size="md"
      rightSection={<IconDeviceDesktop size={20} />}
      onClick={openModal}
    >
      Visualizar
    </Button>
  );
}

export default function FormActions({
  isSubmitting,
  openPreviewModal,
  submitText,
}: {
  isSubmitting: boolean;
  submitText: string;
  openPreviewModal?: () => void;
}) {
  return (
    <div className="flex gap-2 pt-8">
      <Button component={Link} href="/multicaixa" variant="default" size="md">
        Voltar
      </Button>
      {openPreviewModal && <PreviewModalTrigger openModal={openPreviewModal} />}
      <Button size="md" type="submit" loading={isSubmitting}>
        {submitText}
      </Button>
    </div>
  );
}
