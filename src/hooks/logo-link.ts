"use client";

import { useColorScheme } from "@mantine/hooks";

import dark from "@/assets/logo_dark.svg";
import light from "@/assets/logo_light.svg";

export const useLogoLink = () => {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? dark : light;
};
