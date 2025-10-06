"use client";

import { usePathname } from "next/navigation";

import Authentication from "./Authentication";
import Image from "next/image";

import logo from "@/assets/logo_light.svg";

function AppHeader() {
  return (
    <div className="flex items-center justify-between h-24 mb-4">
      <Image
        src={logo}
        alt="Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <Authentication />
    </div>
  );
}

export default function Header() {
  const isHome = usePathname() === "/home";

  if (!isHome) {
    return <AppHeader />;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full flex items-center h-24 ">
      <div className="container w-full flex items-center justify-between">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <Authentication />
      </div>
    </header>
  );
}
