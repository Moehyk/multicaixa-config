import React from "react";

export default function RootWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col-fluid flex-row ">
        <div className="flex-row-fluid relative flex min-h-dvh flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
