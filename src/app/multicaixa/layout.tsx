import { getEmpresa } from "@/server/services";

import {
  MulticaixaRouteWrapper,
  EmpresaLoader,
  AppHeader,
  EmpresaDisplayer,
  Footer,
} from "@/components";

export default async function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  const { data } = await getEmpresa();

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
      <Footer />
    </>
  );
}
