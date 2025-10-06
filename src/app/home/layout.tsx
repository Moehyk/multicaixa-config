import { PageWrapper } from "@/components/wrappers";
import { Header } from "@/components/header";
import { Anchor } from "@mantine/core";
import { Footer } from "@/components/footer";

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
