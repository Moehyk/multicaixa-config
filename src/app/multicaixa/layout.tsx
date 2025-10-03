import { EmpresaLoader, EmpresaToolbar } from "@/components";

export default function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <EmpresaLoader>
        <EmpresaToolbar />
      </EmpresaLoader>
      <div className="mt-28">{children}</div>
    </>
  );
}
