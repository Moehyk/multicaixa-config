import React from "react";

export default function PageWrapper({ children }: React.PropsWithChildren) {
  return (
    <main className="flex-1 mt-8">
      <div className="container">{children}</div>
    </main>
  );
}
