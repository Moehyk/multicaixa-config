"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  return <KindeProvider>{children}</KindeProvider>;
}
