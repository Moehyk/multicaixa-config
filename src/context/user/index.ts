import { create } from "zustand";

import type { UserInfo } from "@/types";

export const userStore = create<UserInfo>(() => ({
  name: null,
  surname: null,
  picture: null,
}));

export const initUserStore = (user: UserInfo) => {
  userStore.setState(user);
};

export { default as UserStoreInit } from "./UserStoreInit";
