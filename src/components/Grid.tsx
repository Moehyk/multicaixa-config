import React from "react";

export default function Grid({ children }: React.PropsWithChildren) {
  return <div className="grid grid-cols-4 gap-4 mt-4">{children}</div>;
}
