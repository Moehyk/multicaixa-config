import { CSSVariablesResolver } from "@mantine/core";

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-body": theme.colors.gray[0],
    "--mantine-color-text": theme.colors.gray[7],
    "--mantine-paper-body": theme.white,
    "--mantine-body-accent": theme.colors.gray[1],
    "--mantine-color-default-color": theme.colors.gray[7],
    "--paper": "255 255 255",
    "--border": "222 226 230",
  },
  dark: {
    "--mantine-color-body": theme.colors.dark[9],
    "--mantine-color-text": theme.colors.gray[3],
    "--mantine-paper-body": theme.colors.dark[7],
    "--mantine-body-accent": theme.colors.dark[8],
    "--paper": "36 36 36",
    "--border": "66 66 66",
  },
});
