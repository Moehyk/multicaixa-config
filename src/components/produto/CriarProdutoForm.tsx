"use client";

import { Card, TextInput, Button, Tabs } from "@mantine/core";
import { CardTitle } from "@/components";
import CreatePagamentoForm from "./CreatePagamentoForm";
import CreateCarregamentoForm from "./CreateCarregamentoForm";
import CreateRecargasForm from "./CreateRecargasForm";

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
          <CreatePagamentoForm servicoId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="carregamentos">
          <CreateCarregamentoForm servicoId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="recargas">
          <CreateRecargasForm servicoId={id} />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
