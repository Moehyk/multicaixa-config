import AuthDisplayer from "./AuthDisplayer";
import { LogoLink } from "@/components";

export default function HomeHeader() {
  return (
    <header className="w-full flex items-center h-20">
      <div className="container w-full flex items-center justify-between">
        <LogoLink />
        <AuthDisplayer />
      </div>
    </header>
  );
}
