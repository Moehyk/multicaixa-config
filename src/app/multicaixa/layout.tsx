import { Suspense } from "react";
import {
  PageWrapper,
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
      <main className="mt-28 flex-1 overflow-hidden">
        <PageWrapper>
          <AppHeader />
          <Suspense fallback={<GlobalLoader />}>
            <EmpresaLoader>
              <EmpresaDisplayer />
              {children}
            </EmpresaLoader>
          </Suspense>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
}
