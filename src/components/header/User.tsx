import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { LogoutLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, Avatar, Loader } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";

function UserWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center gap-8  rounded-full p-2 text-white  bg-user-accent">
      {children}
    </div>
  );
}

export default function User() {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  const isHome = usePathname() === "/";

  if (isLoading) {
    return (
      <UserWrapper>
        <div className="flex items-center h-[28px] w-48 justify-center">
          <Loader size="sm" type="bars" />
        </div>
      </UserWrapper>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        component={LoginLink}
        postLoginRedirectURL="/multicaixa"
        radius={999}
        size="lg"
        color="brand.8"
        rightSection={<IconLogin size={20} />}
      >
        Login
      </Button>
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
      {isHome && (
        <Button
          component={Link}
          href="/multicaixa"
          radius={999}
          size="xs"
          rightSection={<IconLogin size={20} />}
        >
          Entrar
        </Button>
      )}
      {!isHome && (
        <Button
          component={LogoutLink}
          color="red"
          size="xs"
          radius={999}
          rightSection={<IconLogout size={20} />}
        >
          Sair
        </Button>
      )}
    </UserWrapper>
  );
}
