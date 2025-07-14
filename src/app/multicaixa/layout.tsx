import { Suspense } from "react";
import { EmpresaWidget, EmpresaLoading } from "@/components/empresa";

export default function MulticaixaLayout({
  children,
  mcxmodal,
}: {
  children: React.ReactNode;
  mcxmodal: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-16">
        <Suspense fallback={<EmpresaLoading />}>
          <EmpresaWidget />
        </Suspense>
        {children}
      </div>
      {mcxmodal}
    </>
  );
}
