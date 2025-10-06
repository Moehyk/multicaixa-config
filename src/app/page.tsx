import { PageWrapper } from "@/components/wrappers";
import { Header } from "@/components/header";
import { Anchor } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-accent flex-1">
        <PageWrapper>
          <div className="mt-32 ">
            <Anchor href="/multicaixa" className="text-white">
              Multicaixa
            </Anchor>
          </div>
        </PageWrapper>
      </div>
    </>
  );
}
