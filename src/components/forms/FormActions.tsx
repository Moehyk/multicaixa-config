import Link from "next/link";
import { Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

function VoltarAction() {
  return (
    <Button component={Link} href="/multicaixa" variant="default" size="md">
      Voltar
    </Button>
  );
}

function VisualizarAction({
  openPreviewModal,
}: {
  openPreviewModal: () => void;
}) {
  return (
    <Button
      variant="light"
      size="md"
      rightSection={<IconDeviceDesktop size={20} />}
      onClick={openPreviewModal}
    >
      Visualizar
    </Button>
  );
}

function CriarAction() {
  return (
    <Button size="md" type="submit">
      Criar
    </Button>
  );
}

function EditarAction() {
  return (
    <Button size="md" type="submit">
      Salvar
    </Button>
  );
}

export default function FormActions({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className="flex gap-2 pt-8">{children}</div>;
}

FormActions.Voltar = VoltarAction;
FormActions.Visualizar = VisualizarAction;
FormActions.Criar = CriarAction;
FormActions.Editar = EditarAction;
