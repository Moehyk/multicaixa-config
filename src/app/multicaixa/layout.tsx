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
    <>
      <PageWrapper>
        <Header />
        <EmpresaLoader>
          <EmpresaToolbar />
        </EmpresaLoader>
        {children}
      </PageWrapper>
      <Footer />
    </>
  );
}
