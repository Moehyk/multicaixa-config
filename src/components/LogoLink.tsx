"use client";

import { useColorScheme } from "@mantine/hooks";

import Link from "next/link";
import Image from "next/image";

import dark from "@/assets/logo_dark.svg";
import light from "@/assets/logo_light.svg";

export default function LogoLink({ hasType = true }: { hasType?: boolean }) {
  const colorScheme = useColorScheme();

  return (
    <Link href="/home" className="flex items-center gap-3">
      <Image
        src={colorScheme === "dark" ? dark : light}
        alt="Logo"
        width={32}
        height={32}
        className="object-contain"
        priority
      />
      {hasType && <span className="text-xl font-bold">McxConfig</span>}
    </Link>
  );
}
