import { getEmpresa } from "@/server/services";

import {
  MulticaixaRouteWrapper,
  AppHeader,
  Footer,
  EmpresaDisplayer,
} from "@/components";

export default async function MulitcaixaLayout({
  children,
}: React.PropsWithChildren) {
  const { data } = await getEmpresa();

  return (
    <>
      <MulticaixaRouteWrapper>
        <AppHeader data={data} />
        {data && <EmpresaDisplayer data={data} />}
        {children}
      </MulticaixaRouteWrapper>
      <Footer />
    </>
  );
}
