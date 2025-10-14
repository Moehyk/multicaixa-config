import { Anchor } from "@mantine/core";

export default function Home() {
  return (
    <div className="flex-1 max-h-dvh bg-blue-500">
      <div className="container flex flex-col">
        <div className="mt-32">
          <Anchor href="/multicaixa" className="text-white">
            Multicaixa
          </Anchor>
        </div>
      </div>
    </div>
  );
}
