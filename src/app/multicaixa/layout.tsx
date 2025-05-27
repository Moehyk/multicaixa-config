import React from "react";
import { EmpresaWidget } from "@/components";

export default function MulticaixaLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div>
      <EmpresaWidget />
      {children}
    </div>
  );
}
