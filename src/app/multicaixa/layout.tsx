import {
  PageWrapper,
  Header,
  EmpresaLoader,
  EmpresaToolbar,
  Footer,
} from "@/components";

export default function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <EmpresaLoader>
      <PageWrapper>
        <Header />
        <EmpresaToolbar />
        {children}
      </PageWrapper>
      <Footer />
    </EmpresaLoader>
  );
}
