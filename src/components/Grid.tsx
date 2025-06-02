import NewGridItem from "./NewGridItem";
import GridCard from "./GridCard";

export default function Grid({
  action,
  children,
}: {
  action: "SERVICO" | "CARGAMENTO" | "RECARGAMENTO";
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <NewGridItem action={action} />
      {children}
    </div>
  );
}

Grid.Card = GridCard;
