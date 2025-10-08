import { HomeHeader } from "@/components";
import { Footer } from "@/components/footer";

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <HomeHeader />
      {children}
      <Footer />
    </>
  );
}
