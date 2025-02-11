import React from "react";

export default function PageWrapper({ children }: React.PropsWithChildren) {
  return (
    <main className="mt-16 flex-1">
      <div className="container">{children}</div>
    </main>
  );
}
