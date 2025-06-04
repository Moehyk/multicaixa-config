import { Suspense } from "react";
import { EmpresaLoading, EmpresaLoader } from "@/components/empresa";

export default function MulticaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div>
      <Suspense fallback={<EmpresaLoading />}>
        <EmpresaLoader />
      </Suspense>
      {children}
    </div>
  );
}
