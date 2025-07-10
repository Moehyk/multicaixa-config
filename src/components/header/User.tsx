import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Menu, Button } from "@mantine/core";
import { IconUser, IconBuilding, IconDoorExit } from "@tabler/icons-react";

export default function User() {
  const { user, isLoading } = useKindeBrowserClient();

  return (
    <Menu>
      <Menu.Target>
        <Button
          loading={isLoading!}
          variant="default"
          leftSection={<IconUser size={20} stroke={1.75} />}
        >
          {`${user?.given_name} (${user?.family_name})`}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/multicaixa/empresa"
          leftSection={<IconBuilding size={14} />}
        >
          Editar Empresa
        </Menu.Item>
        <Menu.Item
          component={LogoutLink}
          color="red"
          leftSection={<IconDoorExit size={14} />}
        >
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
