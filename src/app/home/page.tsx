import { PageWrapper } from "@/components/wrappers";
import { Anchor } from "@mantine/core";

export default function Home() {
  return (
    <div className="flex-1 max-h-dvh bg-blue-500">
      <PageWrapper>
        <div className="mt-32">
          <Anchor href="/multicaixa" className="text-white">
            Multicaixa
          </Anchor>
        </div>
      </PageWrapper>
    </div>
  );
}
