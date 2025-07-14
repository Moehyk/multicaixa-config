import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { LogoutLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, Avatar, Loader } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";

function UserWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center gap-8 border border-border rounded-full p-2 ">
      {children}
    </div>
  );
}

function LoginButton() {
  return (
    <Button
      component={Link}
      href="/multicaixa"
      radius={999}
      rightSection={<IconLogin size={20} />}
    >
      Entrar
    </Button>
  );
}

export default function User() {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  const isHome = usePathname() === "/";

  if (isLoading) {
    return (
      <UserWrapper>
        <div className="flex items-center h-[36px]">
          <Loader size="md" type="dots" w={200} />
        </div>
      </UserWrapper>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        component={LoginLink}
        radius={999}
        rightSection={<IconLogin size={20} />}
      >
        Entrar
      </Button>
    );
  }

  return (
    <UserWrapper>
      <div className="flex items-center gap-2">
        <Avatar
          src={user?.picture}
          alt="Avatar"
          radius="xl"
          className="border border-border"
        />
        <span>
          <span>Bem vindo&#44;&nbsp;</span>
          <span className="font-semibold">{`${user?.given_name} ${user?.family_name}`}</span>
        </span>
      </div>
      {isHome && <LoginButton />}
      {!isHome && (
        <Button
          component={LogoutLink}
          color="red"
          radius={999}
          rightSection={<IconLogout size={20} />}
        >
          Sair
        </Button>
      )}
    </UserWrapper>
  );
}
