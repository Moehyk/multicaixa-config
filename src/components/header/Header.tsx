"use client";

import User from "./User";

import Image from "next/image";

import logo_dark from "@/assets/logo_dark.svg";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full flex items-center h-24 bg-brand-600">
      <div className="container w-full flex items-center justify-between">
        <Image
          src={logo_dark}
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <User />
      </div>
    </header>
  );
}
