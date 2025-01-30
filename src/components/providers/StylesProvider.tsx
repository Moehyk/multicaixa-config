import { MantineProvider } from "@mantine/core";

export default function StylesProvider({ children }: React.PropsWithChildren) {
  return <MantineProvider>{children}</MantineProvider>;
}
