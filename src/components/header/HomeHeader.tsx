import AuthDisplayer from "./AuthDisplayer";
import Image from "next/image";

import logo from "@/assets/logo_light.svg";

export default function HomeHeader() {
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
        <AuthDisplayer />
      </div>
    </header>
  );
}
