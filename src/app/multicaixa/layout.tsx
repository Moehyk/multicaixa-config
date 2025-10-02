import { EmpresaToolbar } from "@/components";

export default function MulticaixaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmpresaToolbar />
      <div className="mt-28">{children}</div>
    </>
  );
}
