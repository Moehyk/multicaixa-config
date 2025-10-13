"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRef } from "react";
import { userStore } from ".";

export default function UserStoreInit({ children }: React.PropsWithChildren) {
  const { user, isLoading } = useKindeBrowserClient();
  const init = useRef(false);

  if (isLoading) return null;

  if (!init.current) {
    userStore.setState({
      name: user?.given_name,
      surname: user?.family_name,
      picture: user?.picture,
    });
    init.current = true;
  }

  return <>{children}</>;
}
