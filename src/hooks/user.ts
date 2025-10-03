"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

export const useUserData = () => {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  const isHome = usePathname() === "/";

  return {
    user,
    isLoading,
    isAuthenticated,
    isHome,
  };
};
