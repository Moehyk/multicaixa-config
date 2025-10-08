"use client";

import { useAuthInfo } from "@/hooks/user";

import Link from "next/link";
import UserDisplayer from "./UserDisplayer";
import { usePathname } from "next/navigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, Avatar } from "@mantine/core";
import { IconLogin } from "@tabler/icons-react";

function LoginButton() {
  const { isAuthenticated, isLoading, user } = useAuthInfo();

  if (isLoading) {
    return (
      <Button
        radius={999}
        size="lg"
        variant="outline"
        color="white"
        loading
        loaderProps={{
          size: "sm",
        }}
        styles={{
          label: {
            fontSize: 14,
          },
        }}
      >
        Login
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        component={LoginLink}
        postLoginRedirectURL="/multicaixa"
        radius={999}
        size="lg"
        variant="white"
        rightSection={<IconLogin size={20} />}
        styles={{
          label: {
            fontSize: 14,
          },
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <Button
      component={Link}
      href="/multicaixa"
      radius={999}
      size="lg"
      variant="outline"
      color="white"
      leftSection={
        <Avatar src={user.picture} alt="Avatar" size="sm" radius="xl" />
      }
      rightSection={<IconLogin size={20} />}
      styles={{
        label: {
          fontSize: 14,
        },
      }}
    >
      Entrar
    </Button>
  );
}

export default function AuthDisplayer() {
  const pathName = usePathname();
  const isHome = pathName === "/home";

  if (isHome) {
    return <LoginButton />;
  }

  return <UserDisplayer />;
}
