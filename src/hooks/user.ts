"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { userStore } from "@/context/user";

export const useAuthInfo = () => {
  const user = userStore();
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};
