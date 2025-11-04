import Link from "next/link";
import { Button } from "@mantine/core";

export default function HomeHeroSection() {
  return (
    <section className="h-[800px] bg-hero bg-cover bg-center bg-no-repeat">
      <div className="flex items-center justify-center h-full container">
        <div className="w-full flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-7xl font-semibold">McxConfig</h1>
            <h2 className="text-3xl font-medium mt-4 mb-8">
              Aplicação de Configuração
              <br />
              de Produtos Multicaixa
            </h2>
            <Button
              component={Link}
              variant="outline"
              color="white"
              size="xl"
              href="/multicaixa"
            >
              COMEÇAR
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
