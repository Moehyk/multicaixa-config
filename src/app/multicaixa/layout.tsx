import { EmpresaToolbar } from "@/components";

export default function MulticaixaLayout({
  children,
  mcxmodal,
}: {
  children: React.ReactNode;
  mcxmodal: React.ReactNode;
}) {
  return (
    <>
      <EmpresaToolbar />
      <div className="mt-28">{children}</div>
      {mcxmodal}
    </>
  );
}
