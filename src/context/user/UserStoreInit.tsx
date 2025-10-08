"use client";

import { useRef } from "react";
import { userStore } from ".";

import type { UserInfo } from "@/types";

export default function UserStoreInit(props: UserInfo) {
  const init = useRef(false);

  if (!init.current) {
    userStore.setState(props);
    init.current = true;
  }

  return null;
}
