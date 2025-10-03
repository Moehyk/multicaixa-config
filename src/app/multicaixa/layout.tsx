import { EmpresaLoader, EmpresaToolbar } from "@/components/empresa";

export default function MulticaixaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmpresaLoader>
        <EmpresaToolbar />
      </EmpresaLoader>
      <div className="mt-28">{children}</div>
    </>
  );
}
