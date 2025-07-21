import { CSSVariablesResolver } from "@mantine/core";

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-text": theme.colors.gray[7],
    "--bg-body": "255 255 255",
    "--border": "206 212 218",
    "--mantine-body-accent": theme.colors.gray[0],
    "--bg-accent": "248 250 252",
    "--brand-accent": "43 104 236",
    "--user-accent": "8 78 210",
    "--brand-text": "43 104 236",
  },
  dark: {
    "--mantine-color-text": theme.colors.dark[0],
    "--bg-body": "36 36 36",
    "--mantine-body-accent": theme.colors.dark[8],
    "--bg-accent": "31 31 31",
    "--border": "66 66 66",
    "--brand-accent": "8 78 210",
    "--user-accent": "0 59 168",
    "--brand-text": "209 224 250",
  },
});
