import {
  MulticaixaRouteWrapper,
  EmpresaLoader,
  AppHeader,
  EmpresaDisplayer,
} from "@/components";

export default async function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <MulticaixaRouteWrapper>
        <EmpresaLoader>
          {(data) => (
            <>
              <AppHeader data={data} />
              {data && <EmpresaDisplayer data={data} />}
            </>
          )}
        </EmpresaLoader>
        {children}
      </MulticaixaRouteWrapper>
    </>
  );
}
