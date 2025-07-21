import { Suspense } from "react";
import { EmpresaToolbar, EmpresaLoading, Toolbar } from "@/components";

export default function MulticaixaLayout({
  children,
  mcxmodal,
}: {
  children: React.ReactNode;
  mcxmodal: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<EmpresaLoading />}>
        <EmpresaToolbar />
      </Suspense>
      <div className="mt-28">{children}</div>
      {mcxmodal}
    </>
  );
}
