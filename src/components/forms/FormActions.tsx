import Link from "next/link";
import { Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default function FormActions({
  openPreviewModal,
  submitText,
}: {
  submitText: string;
  openPreviewModal?: () => void;
}) {
  return (
    <div className="flex gap-2 pt-8">
      <Button component={Link} href="/multicaixa" variant="default" size="md">
        Voltar
      </Button>
      {openPreviewModal && (
        <Button
          variant="light"
          size="md"
          rightSection={<IconDeviceDesktop size={20} />}
          onClick={openPreviewModal}
        >
          Visualizar
        </Button>
      )}
      <Button size="md" type="submit">
        {submitText}
      </Button>
    </div>
  );
}
