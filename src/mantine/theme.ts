import { createTheme, InputWrapper } from "@mantine/core";
import { brand, gray, green, orange, red } from "./colors";
import { geistMono, geistSans } from "@/utils";

export const theme = createTheme({
  cursorType: "pointer",
  defaultRadius: "sm",
  primaryColor: "brand",
  primaryShade: { light: 5, dark: 7 },
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  colors: {
    brand,
    green,
    orange,
    red,
  },
  fontFamily: geistSans.style.fontFamily,
  fontFamilyMonospace: geistMono.style.fontFamily,
  components: {
    InputWrapper: InputWrapper.extend({
      defaultProps: {
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
    }),
  },
});
