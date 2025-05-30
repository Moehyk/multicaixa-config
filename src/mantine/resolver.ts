import { CSSVariablesResolver } from "@mantine/core";

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-body": theme.colors.gray[0],
    "--mantine-color-text": theme.colors.gray[7],
    "--mantine-modal": theme.white,
    "--mantine-paper": theme.white,
    "--mantine-paper-border": theme.colors.gray[3],
    "--bg-body": "248 249 250",
    "--border": "206 212 218",
    "--modal-footer": "241 243 245",
    "--modal-footer-border": "222 226 230",
  },
  dark: {
    "--mantine-color-body": "#020617",
    "--mantine-color-text": theme.colors.dark[0],
    "--mantine-modal": theme.colors.dark[9],
    "--mantine-paper": theme.black,
    "--mantine-paper-border": theme.colors.dark[4],
    "--modal-footer": "20 20 20",
    "--modal-footer-border": "66 66 66",
  },
});
