import { CSSVariablesResolver } from "@mantine/core";

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-body": theme.colors.gray[0],
    "--mantine-color-text": theme.colors.gray[7],
  },
  dark: {
    "--mantine-color-body": "#020617",
    "--mantine-color-text": theme.colors.dark[0],
  },
});
