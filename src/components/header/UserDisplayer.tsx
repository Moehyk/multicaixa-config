"use client";

import { userStore } from "@/context/user";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Avatar, Button, Tooltip, ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

function UserInfo() {
  const { name, surname, picture } = userStore();

  return (
    <div className="flex items-center gap-2">
      <Avatar src={picture} alt="Avatar" size="sm" radius="xl" />
      <span className="text-sm">
        <span>Bem vindo&#44;&nbsp;</span>
        <span className="font-semibold">{`${name} ${surname}`}</span>
      </span>
    </div>
  );
}

export default function UserDisplayer() {
  return (
    <div className="flex items-center  gap-8">
      <UserInfo />
      <Button
        component={LogoutLink}
        color="red"
        size="xs"
        radius={999}
        rightSection={<IconLogout size={20} />}
      >
        Sair
      </Button>
    </div>
  );
}
