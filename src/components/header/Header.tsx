"use client";
import { useColorScheme } from "@mantine/hooks";

import { Anchor } from "@mantine/core";

import Image from "next/image";

import logo_light from "@/assets/logo_light.svg";
import logo_dark from "@/assets/logo_dark.svg";

function StickyHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 p-4">Header</header>
  );
}

export default function Header() {
  return (
    <header className="flex items-center h-20 bg-white shadow-sm">
      <div className="container w-full flex items-center justify-between">
        <Image
          src={logo_light}
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <div>
          <Anchor href="/multicaixa">Multicaixa</Anchor>
        </div>
      </div>
    </header>
  );
}
