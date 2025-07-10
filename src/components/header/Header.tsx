"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useColorScheme } from "@mantine/hooks";

import Link from "next/link";
import User from "./User";
import { Anchor, Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

import Image from "next/image";

import logo_light from "@/assets/logo_light.svg";
import logo_dark from "@/assets/logo_dark.svg";

export default function Header() {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full flex items-center h-20 bg-header/75 border-b border-header-border backdrop-blur-md">
      <div className="container w-full flex items-center justify-between">
        <Image
          src={logo_light}
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <div>
          {!isAuthenticated && (
            <Button component={Link} href="/multicaixa">
              Entrar
            </Button>
          )}
          {isAuthenticated && (
            <div className="flex gap-2">
              <Button
                leftSection={<IconDeviceDesktop size={20} stroke={1.75} />}
                component={Link}
                href="/multicaixa/mcx"
              >
                Multicaixa
              </Button>
              <User />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
