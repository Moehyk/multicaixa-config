import { Suspense } from "react";
import { EmpresaWidget, EmpresaLoading } from "@/components/empresa";

export default function MulticaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Suspense fallback={<EmpresaLoading />}>
        <EmpresaWidget />
      </Suspense>
      {children}
    </>
  );
}
