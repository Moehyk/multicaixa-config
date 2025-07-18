import React from "react";

export default function PageWrapper({ children }: React.PropsWithChildren) {
  return (
    <main className="flex-1 mt-24">
      <div className="container flex flex-col">{children}</div>
    </main>
  );
}
