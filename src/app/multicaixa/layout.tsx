import { Suspense } from "react";
import { EmpresaLoading, EmpresaLoader } from "@/components/empresa";

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
        <EmpresaLoader />
      </Suspense>
      {children}
      {mcxmodal}
    </>
  );
}
