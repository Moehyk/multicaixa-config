import { Button } from "@mantine/core";

export default function McxInputWrapper({
  children,
  onCancel,
  onContinue,
}: {
  children: React.ReactNode;
  onCancel: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col w-4/5 h-full justify-between mx-auto pb-8">
      {children}
      <div className="flex gap-2 justify-end">
        <Button size="xl" color="red" onClick={onCancel}>
          Cancelar
        </Button>
        <Button size="xl" color="green" onClick={onContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
