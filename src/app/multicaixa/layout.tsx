import { PageWrapper, AppHeader, EmpresaLoader, Footer } from "@/components";

export default function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <EmpresaLoader>
      <main className="mt-28 flex-1 overflow-hidden">
        <PageWrapper>
          <AppHeader />
          {children}
        </PageWrapper>
      </main>
      <Footer />
    </EmpresaLoader>
  );
}
