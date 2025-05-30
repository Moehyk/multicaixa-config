import { Suspense } from "react";
import { EmpresaWidget } from "@/components/empresa";

export default function MulticaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EmpresaWidget />
      </Suspense>
      {children}
    </>
  );
}
