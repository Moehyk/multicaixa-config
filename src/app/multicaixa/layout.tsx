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
        <Suspense fallback={<GlobalLoader />}>
          <EmpresaLoader>
            <EmpresaDisplayer />
            {children}
          </EmpresaLoader>
        </Suspense>
      </MulticaixaRouteWrapper>
      <Footer />
    </>
  );
}
