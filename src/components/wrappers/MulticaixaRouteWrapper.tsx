import React from "react";

export default function MulticaixaRouteWrapper({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col-fluid flex-row ">
        <div className="flex-row-fluid relative flex min-h-dvh flex-col">
          <div className="flex-1 mt-28 overflow-hidden">
            <div className="container flex flex-col">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
