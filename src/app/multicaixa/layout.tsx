import { Suspense } from "react";
import { EmpresaWidget } from "@/components";

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
