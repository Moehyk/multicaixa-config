import { Suspense } from "react";
import {
  MulticaixaRouteWrapper,
  AppHeader,
  EmpresaLoader,
  Footer,
  EmpresaDisplayer,
  GlobalLoader,
} from "@/components";

export default function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <MulticaixaRouteWrapper>
        <AppHeader />
        <Suspense fallback={<div>Loading empresa...</div>}>
          <EmpresaLoader>
            <EmpresaDisplayer />
          </EmpresaLoader>
        </Suspense>
        {children}
      </MulticaixaRouteWrapper>
      <Footer />
    </>
  );
}
