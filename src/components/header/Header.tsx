"use client";
import { useColorScheme } from "@mantine/hooks";

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
    <header className="flex items-center h-20 mb-10 border-b border-b-gray-900">
      <div className="container w-full flex items-center">
        <Image
          src={logo_dark}
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <div className="flex items-center justify-between flex-1 ml-12">
          <nav>
            <ul className="flex gap-4 text-white text-sm">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
            </ul>
          </nav>
          <div>User</div>
        </div>
      </div>
    </header>
  );
}
