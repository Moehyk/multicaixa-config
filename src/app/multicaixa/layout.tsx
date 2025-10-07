import {
  PageWrapper,
  Header,
  EmpresaLoader,
  EmpresaDisplayer,
  Footer,
} from "@/components";

export default function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <EmpresaLoader>
      <PageWrapper>
        <Header />
        <EmpresaDisplayer />
        {children}
      </PageWrapper>
      <Footer />
    </EmpresaLoader>
  );
}
