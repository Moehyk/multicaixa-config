"use client";

import { Card, TextInput, Button, Tabs } from "@mantine/core";
import { CardTitle } from "@/components";
import { CreatePagamentoForm } from "@/components/pagamento";

import { tabsTabStyles } from "@/constants/styles";

export default function CriarProdutoForm({ id }: { id: string }) {
  return (
    <Card withBorder p={32}>
      <CardTitle title="Criar Produto" />
      <Tabs defaultValue="pagamento" variant="pills">
        <Tabs.List grow>
          <Tabs.Tab value="pagamento" className={tabsTabStyles}>
            Pagamento
          </Tabs.Tab>
          <Tabs.Tab value="carregamentos" className={tabsTabStyles}>
            Carregamentos
          </Tabs.Tab>
          <Tabs.Tab value="recargas" className={tabsTabStyles}>
            Recargas
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="pagamento">
          <CreatePagamentoForm servicoId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="carregamentos">
          <div className="py-8">
            <TextInput label="Descrição" placeholder="Descrição do produto" />
            <TextInput label="Descrição" placeholder="Descrição do produto" />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="recargas">
          <div className="py-8">
            <TextInput label="Descrição" placeholder="Descrição do produto" />
            <TextInput label="Descrição" placeholder="Descrição do produto" />
          </div>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
