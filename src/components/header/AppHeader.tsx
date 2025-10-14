"use client";

import { useIntersectionObserver, useRenderWithAnimation } from "@/hooks";

import { LogoLink } from "@/components";
import AuthDisplayer from "./AuthDisplayer";
import EmpresaToolbar from "./EmpresaToolbar";

function MotionLogoLink({ isVisible }: { isVisible: boolean }) {
  const shouldRender = useRenderWithAnimation(isVisible);

  if (!shouldRender) return null;

  return (
    <div className={`${shouldRender ? "animate-fade-in" : "animate-fade-out"}`}>
      <LogoLink />
    </div>
  );
}

export default function AppHeader() {
  const { intersecting } = useIntersectionObserver({
    root: null,
    threshold: 1,
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-20 h-16 bg-paper/50 flex items-center border-b border-border backdrop-blur-xl drop-shadow-sm">
      <div className="container w-full flex items-center justify-between">
        {intersecting && <MotionLogoLink isVisible={true} />}
        {!intersecting && <EmpresaToolbar isVisible={true} />}
        <AuthDisplayer />
      </div>
    </header>
  );
}
