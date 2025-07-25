import { McxWrapper, McxToolbar } from "@/components/multicaixa";

export default function McxLayout({ children }: React.PropsWithChildren) {
  return (
    <McxWrapper>
      <McxToolbar />
      {children}
    </McxWrapper>
  );
}
