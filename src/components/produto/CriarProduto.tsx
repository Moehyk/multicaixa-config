"use client";

import { Card, Tabs } from "@mantine/core";
import { CardTitle } from "@/components";
import CreatePagamento from "./CreatePagamento";
import CreateCarregamento from "./CreateCarregamento";
import CreateRecargas from "./CreateRecargas";

import styles from "./tabs.module.css";

export default function CriarProdutoForm({ id }: { id: string }) {
  return (
    <Card withBorder p={32}>
      <CardTitle title="Criar Produto" />
      <Tabs defaultValue="pagamento" variant="pills">
        <Tabs.List grow>
          <Tabs.Tab value="pagamento" className={styles.tabs}>
            Pagamento
          </Tabs.Tab>
          <Tabs.Tab value="carregamentos" className={styles.tabs}>
            Carregamentos
          </Tabs.Tab>
          <Tabs.Tab value="recargas" className={styles.tabs}>
            Recargas
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="pagamento">
          <CreatePagamento servicoId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="carregamentos">
          <CreateCarregamento servicoId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="recargas">
          <CreateRecargas servicoId={id} />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
