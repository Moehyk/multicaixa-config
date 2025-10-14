import React from "react";

export default function PageWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex-1 mt-28 overflow-hidden">
      <div className="container flex flex-col">{children}</div>
    </div>
  );
}
