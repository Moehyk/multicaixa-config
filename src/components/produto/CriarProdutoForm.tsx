"use client";

import { Card, TextInput, Button, Tabs } from "@mantine/core";
import { CardTitle } from "@/components";
import { CreatePagamentoForm } from "@/components/pagamento";

export default function CriarProdutoForm({ id }: { id: string }) {
  return (
    <Card withBorder p={32}>
      <div className="pb-8">
        <CardTitle title="Criar Produto" />
        <div className="flex w-full  gap-4">
          <TextInput label="Designação p/ ecrã" className="flex-1" />
          <TextInput
            label="Designação p/ tecla de selecção"
            className="flex-1"
          />
        </div>
      </div>
      <Tabs defaultValue="pagamento" variant="default">
        <Tabs.List grow>
          <Tabs.Tab value="pagamento" className="border-l-0 rounded-s-none">
            Pagamento
          </Tabs.Tab>
          <Tabs.Tab value="carregamentos">Carregamentos</Tabs.Tab>
          <Tabs.Tab value="recargas" className="border-r-0 rounded-e-none">
            Recargas
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="pagamento">
          <CreatePagamentoForm desigEcra="" desigSelecao="" servicoId={id} />
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
