"use client";

import { useUserData } from "@/hooks/user";

import Link from "next/link";
import { LogoutLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, Avatar, Loader } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";

function UserWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center rounded-full p-2 border border-border gap-8 bg-paper">
      {children}
    </div>
  );
}

function LoginButton({
  isAuthenticated,
  isLoading,
  picture,
}: {
  isAuthenticated: boolean | null;
  isLoading: boolean | null;
  picture: string | undefined | null;
}) {
  if (isLoading) {
    return (
      <Button
        radius={999}
        size="lg"
        variant="outline"
        color="white"
        loading
        loaderProps={{
          type: "bars",
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
      leftSection={<Avatar src={picture} alt="Avatar" size="sm" radius="xl" />}
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
  const { user, isLoading, isAuthenticated, isHome } = useUserData();

  if (isHome) {
    return (
      <LoginButton
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        picture={user?.picture}
      />
    );
  }

  if (isLoading) {
    return (
      <UserWrapper>
        <div className="flex items-center h-[28px] w-16 justify-center">
          <Loader size="sm" type="bars" />
        </div>
      </UserWrapper>
    );
  }

  return (
    <UserWrapper>
      <div className="flex items-center gap-2">
        <Avatar src={user?.picture} alt="Avatar" size="sm" radius="xl" />
        <span className="text-sm">
          <span>Bem vindo&#44;&nbsp;</span>
          <span className="font-semibold">{`${user?.given_name} ${user?.family_name}`}</span>
        </span>
      </div>
      <Button
        component={LogoutLink}
        color="red"
        size="xs"
        radius={999}
        rightSection={<IconLogout size={20} />}
      >
        Sair
      </Button>
    </UserWrapper>
  );
}
